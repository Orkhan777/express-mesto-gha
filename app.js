const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { ERROR_NOT_FOUND } = require('./utils/errors');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRouter);
app.use(cardRouter);

app.use((req, res, next) => {
  req.user = {
    _id: '64a1b65701dd9976ad2378d3',
  };
  next();
});

app.all('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Страница не найдена' });
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
app.listen(PORT);
