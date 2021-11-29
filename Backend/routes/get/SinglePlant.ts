export{};
const express = require('express');
const router = express.Router();
const Plants = require('../../models/Plants.ts');
const authToken = require('./../../config/tokens').authorization_token;

router.get('/:id', async (req, res) => {
    const query = req.query;

    // req.headers.authorization == `Basic ${authToken}` ||
    if(query.auth === authToken) {
        await Plants
            .findOne(
                {PlantID: req.params.id},
                '-_id -__v',
                {}
            )
            .exec()
            .then(result => {
                res.status(200)
                    .send({
                        "ok":true,
                        "data":result,
                    }).end();
            })
            .catch(e => {
                console.log(e);
                res.status(500)
                    .send('Internal error, something went wrong. Error has been logged.')
            });
    }

    else {
        res.status(401)
            .send('This request is unauthorized, please authenticate your browser.');
    }

    // Send the data.
})


module.exports = router;

// Measurements
// Measurements
