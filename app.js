const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Todolist = require('./models/todolistSchema')

mongoose.connect('mongodb://localhost:27017/todoListDB', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connection succesful")
})

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use('/public', express.static('public'))

app.get('/todolist', async (req, res) => {
  const todoItems = await Todolist.find()
  res.render('todolistview/show', {todoItems})
})

app.get('/todolist/:id', async (req, res) => {
  const {id} = req.params
  const foundItem = await Todolist.findById(id)
  res.render('todolistview/showTodo', {foundItem})
})

app.post('/todolist', async (req, res) => {
  const {newItem} = req.body
  await Todolist.insertMany({item: newItem})
  res.redirect('/todolist')
})

app.delete('/todolist/:id', async (req, res) => {
  const {id} = req.params
  await Todolist.findByIdAndDelete(id)
  res.redirect(`/todolist`)
})

app.listen(3000, () => {
  console.log("Port Started at 3000")
})