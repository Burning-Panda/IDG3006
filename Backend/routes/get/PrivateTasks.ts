export{};
const express = require('express');
const router = express.Router();
const Tasks = require('../../models/Tasks.ts');
const authToken = require('./../../config/tokens').authorization_token;

router.get('/:id', async (req, res) => {
    const query = req.query;

    // req.headers.authorization == `Basic ${authToken}` ||
    if(query.auth === authToken) {
        await Tasks
            .find({
                PlantID: req.params.id
            })
            .exec()
            .then(result => {
                res.status(200)
                    .send({
                        "ok":true,
                        "data":result,
                    });
            });
    }

    else {
        res.status(401).send('This request is unauthorized, please authenticate your method.');
    }

    // Send the data.
})


module.exports = router;
