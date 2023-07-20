const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/auth');
const auth = require('./routes/auth');

const app = express();

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('./public'))
app.use(cookieParser(process.env.COOKIE_SECRET));
const port = process.env.PORT || 3001

// view engine
app.set('view engine', 'ejs');

// database connection
mongoose
    .connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}${process.env.MONGODB_URI}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
)
    .then(() => console.log('DB Connected'))
    .catch(error => {
        console.log('connection error', error.message);
    });

app.use(auth);

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/stores', requireAuth, (req, res) => res.render('stores'));
app.listen(port, () => { console.log(`Running on port ${port}`) });
app.use(auth);
