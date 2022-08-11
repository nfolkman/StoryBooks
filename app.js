//// REQUIRE MODULES, etc. ////
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')
// const { default: mongoose } = require('mongoose')


// load config //
dotenv.config({path: `./config/config.env`})


// Passport config
require('./config/passport')(passport)


connectDB()



// declare app variable
const app = express()




// logging requests
if(process.env.NODE_ENV === 'development'){
   app.use(morgan('dev'))
}


// establish Handlebars template viewing engine and shorten extension name
app.engine('.hbs', exphbs.engine({defaultLayout: `main` , extname: `.hbs`}))
app.set('view engine', '.hbs')



// Sessions
app.use(session({
   secret: 'keyboard cat',
   resave: false,
   saveUninitialized: false,
   store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
 }))



// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())



// Static Folder
app.use(express.static(path.join(__dirname, 'public')))




// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))





// declare PORT variable
const PORT = process.env.PORT || 3000


// launch server and log confirmation to console
app.listen(
   PORT, 
   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)