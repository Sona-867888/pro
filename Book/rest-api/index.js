const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require('http-errors'); // Import createError module

const mongoDb = require('./database/db');
mongoose.Promise = global.Promise;

mongoose.connect(mongoDb.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(error => {
    console.log("Database connection error:" + error);
  });

const bookRoute = require("./node-backened/routes/book.routes");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/Bookstore')));

app.use('/api', bookRoute);
const port = process.env.port || 8000;

app.listen(port, () => {
  console.log("Listening on port:" + port);
});

app.use((req, res, next) => {
  next(createError(404));
});

app.get('/', (req, res) => {
  console.log("Invalid error");
});

// Handle user login and redirect to the header component
app.post('/api/login', (req, res) => {
  // Handle user login logic, verify credentials, and issue a JWT token if successful

  // After successful login, redirect to the header component with an authentication query parameter
  res.redirect('/header?authenticated=true');
});

// Handle user signup and redirect to the header component
app.post('/api/signup', (req, res) => {
  // Handle user registration logic, store user data in MongoDB

  // After successful signup, redirect to the header component with an authentication query parameter
  res.redirect('/header?authenticated=true');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/Bookstore/index.html'));
});

app.use(function (err, req, res, next) {
  console.log(err.message);

  if (!err.statusCode) err.statusCode = 500;

  res.status(err.statusCode).send(err.message);
});
