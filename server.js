if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express');

const app = express();

const bodyParser = require('body-parser')

//Routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const authorsRoute = require('./routes/authors');


//Application Settings

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/static', express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: false}));
// app.use(express.json());

//DATABASE
const mongoose = require('mongoose');
const { use } = require('./routes/authors');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

//Routers, Views

app.use('/', indexRouter) 
    
app.use('/users', userRouter)
app.use('/login', loginRouter)
app.use('/authors', authorsRoute)

app.listen(process.env.PORT || 5000);