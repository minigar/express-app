require('dotenv').config();
const express = require('express');
const passport = require('passport');
require('./lib/passport-config')(passport)
const session = require('express-session')

const config = require('./lib/config');
const mongooseConfig = require('./lib/mongoose-config');
const routes = require('./routes');
const handlers = require('.//handlers');
const auth = require('./routes/auth');


const app = express();

// connect to mongoDB
mongooseConfig();

// add middleware for handlers
handlers.forEach((h) => {app.use(h)});

app.set('view engine', 'ejs');
app.use(express.static('views'))

// parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// add prefix to routes(without auth.js)
app.use('/api', routes)
app.use('/api/auth', auth)


app.use(session({ // session middleware
    secret: config.jwt.secret,
    resave: false,
    saveUninitialized: false,
    cookie: config.session.cookie
}));


// passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.listen(config.port, () => console.log(`Server has been started at ${config.port} port`))