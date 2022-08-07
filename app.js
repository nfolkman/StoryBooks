//// REQUIRE MODULES, etc. ////
const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')


// load config //
dotenv.config({path: `./config/config.env`})


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



// Static Folder
app.use(express.static(path.join(__dirname, 'public')))




// Routes
app.use('/', require('./routes/index'))





// declare PORT variable
const PORT = process.env.PORT || 3000


// launch server and log confirmation to console
app.listen(
   PORT, 
   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)