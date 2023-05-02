const passport = require('passport')
const DiscordStrategy = require('passport-discord').Strategy

passport.use(new DiscordStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  scope: ['identify']
},
async function (accessToken, refreshToken, profile, cb) {
  try {
    return cb(null, profile)
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
