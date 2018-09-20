const handleSignin = (db, bcrypt) => (req, res) => { // Destructured - here and server.js
    const {email, password} = req.body
    db.select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then(data => {
        const valid = bcrypt.compareSync(password, data[0].hash);
        console.log(valid); 
        if(valid){
            return db.select('*')
            .from('users')
            .where('email', '=', email)
            .then(user => {
                console.log(user)
                res.json(user[0])
            })
            .catch(err => res.status(400).json('Login error'));
        }else{
            console.log('Invalid credentials');
            res.status(400).json('Invalid credentials');
        }
    }).catch(err => res.status(400).json('Wrong credentials'));
};

module.exports = { handleSignin: handleSignin }
