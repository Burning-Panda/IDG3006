export {};
const express = require('express');
const router = express.Router();

/* Input new data into the database. */
router.post('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;