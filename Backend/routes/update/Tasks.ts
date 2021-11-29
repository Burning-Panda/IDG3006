export{};
const express = require('express');
const router = express.Router();
const Tasks = require('../../models/Tasks.ts');
const authToken = require('./../../config/tokens').authorization_token;

router.get('/completed/:id', async (req, res) => {
    const query = req.query;

    // req.headers.authorization == `Basic ${authToken}` ||
    if(query.auth === authToken) {
        // find one by id and update
        Tasks.findOneAndUpdate(
            {_id: req.params.id},
            {
                completed: true,
                completed_at: new Date(),
                completed_by: query.user
            },
            {new: true},
            (err, task) => {
            if(err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(task);
            }
        });
    }

    else {
        res.status(401)
            .json({"message": 'This request is unauthorized, please authenticate your browser.'});
    }
})


module.exports = router;

// Measurements
// Measurements
