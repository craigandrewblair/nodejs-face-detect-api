const bodyParser = require ('body-parser');
const express = require ('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const image = require('./controllers/image.js');
const userid = require('./controllers/userid.js');
const PORT = process.env.PORT || 4000;
var cors = require('cors');
require('dotenv').config();
app.use(cors())
app.use(bodyParser.json());

const db = knex ({
    client: 'pg',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    },
    pool: { min: 0, max: 7 }
});

app.get('/',(req, res) => res.send('Server is running...'));

app.post('/signin', signin.handleSignin(db, bcrypt)); // Destructured - here and signin.js

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.put('/image', (req, res) => { image.handleImage(req, res, db) });

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.get('/user/:id', (req, res) => { userid.handleUserid(req, res, db) });

app.listen(PORT, () => console.log(`Express listening on port ${PORT}`));
