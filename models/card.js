const mongoose = require('mongoose');
const { LINK } = require('../utils/regex');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, ' Максимальная длина поля "name" - 30'],
  },

  link: {
    type: String,
    validate: {
      validator: (v) => LINK.test(v),
      message: 'Неправильный формат ссылки',
    },
    required: [true, 'Поле "link" должно быть заполнено'],
  },
  owner: {
    type: mongoose.ObjectId,
    required: [true, 'Поле "owner" должно быть заполнено'],
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
