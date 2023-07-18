const express = require('express');
const mongoose = require('mongoose');
const auth = require('./routes/auth');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://warengeorge:test1234@cluster0.quvvuon.mongodb.net/node-auth';
mongoose.connect(dbURI, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/stores', (req, res) => res.render('stores'));
app.use(auth);