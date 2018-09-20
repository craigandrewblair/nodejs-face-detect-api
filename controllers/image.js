const Clarifai = require ('clarifai');
require('dotenv').config();

const app = new Clarifai.App({ apiKey: process.env.CLARIFAI_API });

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.imageUrl)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('API connect error.'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db.select('*')
    .from('users').where('id', '=', id)
    .increment('score', 1)
    .returning('score')
    .then(score => res.json(score[0]))
    .catch(err => res.status(400).json('ID not found'));
}

module.exports = { handleImage: handleImage, handleApiCall: handleApiCall }