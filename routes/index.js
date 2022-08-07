const express = require('express')
const router = express.Router()

//@desc     Login/Landing Page
// @desc   GET to root (/)
router.get('/', (req, res)=> {
   res.render('login',{
      layout: 'login',
   })
})


//@desc     Dashboard
// @desc   GET to (/dashboard)
router.get('/dashboard', (req, res)=> {
   res.render('dashboard')
})

module.exports = router