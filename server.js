const bodyParser = require ('body-parser');
const express = require ('express');
const app = express();
const port = 4000;
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const image = require('./controllers/image.js');
const userid = require('./controllers/userid.js');
var cors = require('cors');
require('dotenv').config();
app.use(cors())
app.use(bodyParser.json());

const db = knex ({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'admindb',
      password : 'pa55w0rd',
      database : 'face_detect'
    },
    pool: { min: 0, max: 7 }
});

app.get('/',(req, res) => res.send(database.users));

app.post('/signin', signin.handleSignin(db, bcrypt)); // Destructured - here and signin.js

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.put('/image', (req, res) => { image.handleImage(req, res, db) });

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.get('/user/:id', (req, res) => { userid.handleUserid(req, res, db) });

app.listen(port, () => console.log(`Express listening on port ${port}`));

// / -> res = Express root route
// /register POST -> res(UserObj)
// /signin POST -> success/fail
// /profile:userId -> GET user
// /image -> PUT -> user