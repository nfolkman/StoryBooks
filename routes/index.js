const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//@desc     Login/Landing Page
// @desc   GET to root (/)
router.get('/', ensureGuest, (req, res)=> {
   res.render('login',{
      layout: 'login',
   })
})


//@desc     Dashboard
// @desc   GET to (/dashboard)
router.get('/dashboard', ensureAuth, (req, res)=> {
   res.render('dashboard')
})

module.exports = router