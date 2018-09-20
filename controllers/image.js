const Clarifai = require ('clarifai');

const app = new Clarifai.App({ apiKey: '9817e5311ff941eca7a6d6a69f880c95' });

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