const handleRegister = (req, res, db, bcrypt) => {
    
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json('Please provide all fields.');
    }

    var hash = bcrypt.hashSync(password);
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*') 
                .insert({
                    name: name,
                    email: loginEmail[0],
                    joindate: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
            })
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .catch(err => res.status(400).json(err));
}

module.exports = { handleRegister: handleRegister }