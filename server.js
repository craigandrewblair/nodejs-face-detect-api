const bodyParser = require ('body-parser');
const express = require ('express');
const app = express();
const port = 4000;

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
        ]
}

//app.use(express.static(__dirname + '/public'));

app.get('/',(req, res) => res.send(database.users));

app.post('/signin',(req, res) => {
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
    const {name, email, body} = req.body;
    database.users.push({
        id: '004',
        name: name,
        email: email,
        password: body,
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