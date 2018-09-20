const handleUserid = (req, res, db) => {
    const { id } = req.params;
    db.select('*')
    .from('users').where('id', '=', id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('ID not found'));
};

module.exports = { handleUserid: handleUserid }