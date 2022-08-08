//// REQUIRE MODULES, etc. ////
const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const connectDB = require('./config/db')


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