import express from 'express';
const router = express.Router();

// TODO: Check JetBrainz Space


router.post('/:guid', (req, res) => {
    // Handle request
    console.log('Params',req.params.guid)

    let x = false;
    if(x) {
        res.set(400).send('Nothing')
    }
    else {
        res.set(400).send(`Nothing Yet.`);
    }
});


module.exports = router;