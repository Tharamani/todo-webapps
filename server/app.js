const express = require('express')
const { connectDb } = require('./config/db')
const todoRouter = require('./routes/todo')
const cors = require('cors')

try {
  const app = express()
  app.use(express.json({ type: '*/*' })) //  parses incoming requests with JSON payloads
  connectDb()
  app.listen(process.env.SERVER_PORT || 5000, () => {
    console.log(`App listening on port ${process.env.SERVER_PORT}`)
  })
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length')
    next()
  })
  app.use('/todo', todoRouter) // mount the router on the app
  app.use(cors())
  
} catch (error) {
  console.log('App Error', error)
}
