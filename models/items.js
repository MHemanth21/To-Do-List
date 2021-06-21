const mongoose = require('mongoose')
const Todolist = require('./todolistSchema')

mongoose.connect('mongodb://localhost:27017/todoListDB', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connection succesful")
})

const todoItems = [
  {
    item: 'Eating'
  },
  {
    item: 'Reading'
  },
  {
    item: 'Fishing'
  },
  {
    item: 'Riding'
  } 
]

Todolist.insertMany(todoItems)
.then(d => {
  console.log(d)
})
.catch(e => {
  console.log(e)
})
