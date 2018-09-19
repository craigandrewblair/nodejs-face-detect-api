const bodyParser = require ('body-parser');
const express = require ('express');
const app = express();
const port = 4000;
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
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

// db.select('*').from('users').then(data => {
//     console.log(data);
// });

// Mimic Database
// const database = {
// users: [
//             {
//                 id: '000',
//                 name: 'Jane Doe',
//                 email: 'janedoe@mail.com',
//                 password: 'cookie',
//                 score: 0,
//                 joindate: new Date()
//             },
//             {
//                 id: '001',
//                 name: 'John Doe',
//                 email: 'johndoe@mail.com',
//                 password: 'homer',
//                 score: 0,
//                 joindate: new Date()
//             },
//             {
//                 id: '002',
//                 name: 'Krabby Doe',
//                 email: 'krabbydoe@mail.com',
//                 password: 'play',
//                 score: 0,
//                 joindate: new Date()
//             }
//         ],
//         login: [
//             {
//                 id: '345',
//                 hash: '',
//                 email: 'jon@mail.com',
//             }
//         ]
// }

//app.use(express.static(__dirname + '/public'));

app.get('/',(req, res) => res.send(database.users));

app.post('/signin',(req, res) => {
    const {email, password} = req.body
    // bcrypt.compare("apples", $2a$10$Kz9rqwWJNbIm9l4dEI1hHOWRMMoKxgyACYD.r2dHxO2/oVhbM0zw6, function(err, res){
    //     console.log("first guess", res);
    // })
    // bcrypt.compare("bacon", $2a$10$Kz9rqwWJNbIm9l4dEI1hHOWRMMoKxgyACYD.r2dHxO2/oVhbM0zw6, function(err, res){
    //     console.log("second guess", res);
    // })
    if(email === database.users[0].email && password === database.users[0].password){
        console.log(database.users[0]);
        //res.status(200).json("Success");
        res.json(database.users[0]);
    }else{
        console.log('Error logging in');
        console.log(req.body.email);
        console.log(database.users[1].email);
        res.status(400).json("Error logging in");
    }
});

app.post('/register',(req, res) => {
    const {name, email, password} = req.body;
    bcrypt.hash(password, null, null, function(err, hash){
        console.log(hash);
    });
    // The returning method specifies which column should be returned by the insert and update methods. 
    // Passed column parameter may be a string or an array of strings
    db('users')
    .returning('*') 
    .insert({
        name: name,
        email: email,
        joindate: new Date()
    })
    .then(response => {
        res.json(response);
    })
    .catch(err => res.status(400).json(err));
    // database.users.push({
    //     id: ("00" + database.users.length),
    //     name: name,
    //     email: email,
    //     score: 0,
    //     password: password,
    //     joindate: new Date()
    // })
    // res.json(database.users[database.users.length-1]);
});

app.get('/user/:id',(req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(id === user.id) {
            found = true;
            return res.json(user);
        }
    });
    if(found === false){
        return res.status(404).json("No such user");
    }
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(id === user.id) {
            found = true;
            user.score++;
            console.log(user);
            return res.json(user);
        }
    });
    if(found === false){
        return res.status(404).json("No such user");
    }
});

app.listen(port, () => console.log(`Express listening on port ${port}`));



// / -> res = Express root route
// /register POST -> res(UserObj)
// /signin POST -> success/fail
// /profile:userId -> GET user
// /image -> PUT -> user