const passport = require('passport')

const DiscordStrategy = require('passport-discord').Strategy
const User = require('../models/User')

passport.use(new DiscordStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  scope: ['identify', 'guilds.join']
},
async function (accessToken, refreshToken, profile, cb) {
  try {
    const user = await User.findOneAndUpdate(
      { userId: profile.id },
      { userId: profile.id, userName: profile.username, accessToken, refreshToken },
      { upsert: true, new: true }
    )
    return cb(null, user)
  } catch (err) {
    return cb(err, null)
  }
}))

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (user, cb) {
  cb(null, user)
})

module.exports = passport
