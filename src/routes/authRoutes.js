const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/auth/discord', passport.authenticate('discord'))

router.get('/auth/discord/callback', passport.authenticate('discord', {
  failureRedirect: '/'
}), function (req, res) {
  res.redirect('/')
})

router.get('/', function (req, res) {
  res.json({ index: true })
})

module.exports = router
