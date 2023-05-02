require('dotenv').config()
const express = require('express')
const helmet = require('helmet')

const session = require('express-session')
const passport = require('./config/passport')

const authRoutes = require('./routes/authRoutes')

const app = express()

app.set('view engine', 'ejs')

app.use(helmet())
app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', authRoutes)

module.exports = { app }
