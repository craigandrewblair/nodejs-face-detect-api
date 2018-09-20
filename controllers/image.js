const handleImage = (req, res, db) => {
    const { id } = req.body;
    db.select('*')
    .from('users').where('id', '=', id)
    .increment('score', 1)
    .returning('score')
    .then(score => res.json(score[0]))
    .catch(err => res.status(400).json('ID not found'));
}

module.exports = { handleImage: handleImage }