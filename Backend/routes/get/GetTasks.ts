export{};
const express = require('express');
const router = express.Router();
const Tasks = require('../../models/Tasks.ts');
const authToken = require('./../../config/tokens').authorization_token;

router.get('/plant/:id', async (req, res, next) => {
    const query = req.query;

    // req.headers.authorization == `Basic ${authToken}` ||
    if(query.auth === authToken) {
        await Tasks
            .find({
                PlantID: req.params.id,
                isPublic: false,
                completed: false
            })
            .sort({
                createTime: -1
            })
            .exec()
            .then(result => {
                res.status(200)
                    .json({
                        "ok":true,
                        "data":result,
                    }).end();
            });
    }

    else {
        res.status(401).send('This request is unauthorized, please authenticate your method.');
    }

    // Send the data.
})

router.get('/public',
    async (req, res) => {
    const query = req.query;


    // req.headers.authorization == `Basic ${authToken}` ||
    if(query.auth === authToken) {

        if (!query.plant && query.plant !== "") {

            await Tasks
                .find({
                    completed: false,
                    public: true,
                    isBooked: false
                    },
                    '-_id -__v -created -createTime -bookedBy -bookedTime -completed',
                    )
                .sort({
                    created: -1
                })
                .exec()
                .then(result => {
                    res.status(200).json({
                        "ok":true,
                        "data": result.reduce((acc, curr) => {
                            if (!acc[curr.PlantID]) {
                                acc[curr.PlantID] = [];
                            }
                            acc[curr.PlantID].push(curr);
                            return acc;
                        }, {})
                    });

                }).catch(err => {
                    res.status(500).json({
                        "ok":false,
                        "message":err
                    });
                });

        } else {
            // The main function, expects a plant id to be present, and will return data based on that.
            await Tasks
                .find({completed: false, isBooked: false},
                    '-_id -__v -created -createTime -bookedBy -bookedTime -completed',
                    )
                .or([{PlantID: query.plant}, {isPublic: true}])
                .sort({
                    created: -1
                })
                .exec()
                .then(result => {
                    res.status(200).json({
                        "ok": true,
                        // create a list of all the plants that have tasks and return their tasks as an object and put list with query.plant first.
                        "data": result.reduce((acc, curr) => {
                            if (!acc[curr.PlantID]) {
                                acc[curr.PlantID] = [];
                            }
                            acc[curr.PlantID].push(curr);
                            return acc;
                        }, {})
                    });

                }).catch(err => {
                    console.log(err)
                    res.status(500).json({
                        "ok": false,
                        "message": err
                    });
                });
        }

    }



    else {
        res.status(401).send('This request is unauthorized, please authenticate your method.');
    }

    // Send the data.
})


module.exports = router;
