import express from 'express';
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';

// TODO: Validate and create users
// - [ ] Create User
// - [ ] Validate against existing users


router.post('/', (req, res) => {
    // Handle request

    let guid = uuidv4();
    res.set(404).send(`Nothing Yet. But here's a UUID: ${guid}`);
});

module.exports = router;