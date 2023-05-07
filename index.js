require('dotenv').config()
require('./src/bot/index')
const { app } = require('./src/app')

const connect = require('./src/config/database')
// const bot = require('src/bot/index')

app.listen(process.env.PORT, () => {
  // bot(process.env.TOKEN)
  connect(process.env.MONGODB_URI)
  console.log(`Listening on port ${process.env.PORT}`)
})
