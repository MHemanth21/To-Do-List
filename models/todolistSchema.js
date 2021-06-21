const mongoose = require('mongoose')

const todoListSchema = mongoose.Schema({
  item: {
    type: String,
    required: true
  }
})

const Todolist = mongoose.model('Todolist', todoListSchema)

module.exports = Todolist;