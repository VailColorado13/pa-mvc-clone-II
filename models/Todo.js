const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  todo: {
    type: Array,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
