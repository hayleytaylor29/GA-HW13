// DEPENDENCIES
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
// const bcrypt = require('bcrypt');
const port = 3000;


// MIDDLEWARE
// body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// static files middleware
app.use(express.static('public'))
app.use(session({
  secret: "feedmeseymour", //some random string
  resave: false,
  saveUninitialized: false
}));

// CONTROLLERS
// fitting room three
const roomController = require('./controllers/room.js');
app.use('/room', roomController);

//create a new user
const userController = require('./controllers/users.js');
app.use('/users', userController);

//create a new session
const sessionController = require('./controllers/sessions.js');
app.use('/sessions', sessionController);



// GET INDEX
app.get('/', (req, res) => {
  res.render('index.ejs', {});
});

//session route
app.get('/new', (req, res) => {
  req.session.login = 'password'
})


// SEED ROUTE
// NOTE: Do NOT run this route until AFTER you have a create user route up and running, as well as encryption working!
const seed = require('./models/seed.js');
const User = require('./models/users.js');

app.get('/seedAgents', (req, res) => {
  // encrypts the given seed passwords
  seed.forEach((user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  });
  // seeds the data
  User.create(seed, (err, createdUsers) => {
    // logs created users
    console.log(createdUsers);
    // redirects to index
    res.redirect('/');
  });
});


// CONNECTIONS
app.listen(port, () => {
  console.log('listening on port: ', port);
});

mongoose.connect('mongodb://localhost:27017/kingsman', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});
