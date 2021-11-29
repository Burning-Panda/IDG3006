export{};
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    res
        .set(200)
        .send()
        .end();
})


module.exports = router;

// Measurements
// Measurements
