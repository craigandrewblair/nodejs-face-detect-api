const bodyParser = require ('body-parser');
const express = require ('express');
const app = express();
const port = 4000;
const bcrypt = require('bcrypt-nodejs');

var cors = require('cors')
app.use(cors())

app.use(bodyParser.json());

// Mimic Database
const database = {
users: [
            {
                id: '001',
                name: 'Jane Doe',
                email: 'janedoe@mail.com',
                password: 'cookie',
                submissions: 0,
                joindate: new Date()
            },
            {
                id: '002',
                name: 'John Doe',
                email: 'johndoe@mail.com',
                password: 'homer',
                submissions: 0,
                joindate: new Date()
            },
            {
                id: '003',
                name: 'Krabby Doe',
                email: 'krabbydoe@mail.com',
                password: 'play',
                submissions: 0,
                joindate: new Date()
            }
        ],
        login: [
            {
                id: '345',
                hash: '',
                email: 'jon@mail.com',
            }
        ]
}

//app.use(express.static(__dirname + '/public'));

app.get('/',(req, res) => res.send(database.users));

app.post('/signin',(req, res) => {
    // bcrypt.compare("apples", $2a$10$Kz9rqwWJNbIm9l4dEI1hHOWRMMoKxgyACYD.r2dHxO2/oVhbM0zw6, function(err, res){
    //     console.log("first guess", res);
    // })
    // bcrypt.compare("bacon", $2a$10$Kz9rqwWJNbIm9l4dEI1hHOWRMMoKxgyACYD.r2dHxO2/oVhbM0zw6, function(err, res){
    //     console.log("second guess", res);
    // })
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json("Success");
    }else{
        res.status(400).json("Error logging in");
    }
});

app.get('/user/:id',(req, res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        if(id === user.id){
            found = true;
            return res.json(user);
        }
    });
    if(found === false){
        return res.status(404).json("No such user");
    }
});

app.post('/register',(req, res) => {
    const {name, email, password} = req.body;
    bcrypt.hash(password, null, null, function(err, hash){
        console.log(hash);
    });
    database.users.push({
        id: '004',
        name: name,
        email: email,
        password: password,
        submissions: 0,
        joindate: new Date()
    })
    res.json(database.users[database.users.length-1]);
});

app.post('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if(id === user.id){
            found = true;
            return res.json(user.submissions++);
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