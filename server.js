if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express');

const app = express();

//Routes
const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')

//Application

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/static', express.static(__dirname + '/static'));

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


app.use('/', indexRouter) 
    
app.use('/users', userRouter)

app.listen(process.env.PORT || 5000);