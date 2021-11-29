import express from 'express';
const router = express.Router();
const Microcontroller = require("../../models/Microcontroller.ts");
const cPass = require('../../config/database.ts').controlPassword;
const namespaces = require('../../config/database.ts').namespace;
import { v5 as uuidv5 } from 'uuid';
const { nanoid } = require('nanoid')

// RegEx UUIDv4 test string.
const UUID_regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;


router.post('/', async (req, res) => {
    try {
        // Get user input
        const { name, password } = req.body;

        // Validate user input
        if (!(name && password) && (UUID_regex.test(name) && password === cPass)) {
            res.status(400).send("All input is required or is not valid.");
        }

        // check if user already exist
        // Validate if user exist in our database
        const existingController = await Microcontroller.findOne({ name });

        if (existingController) {
            return res.status(409).send("Sorry. This Controller already exists.");
        }


        // Generate a unique name for this controller
        let ControllerName = nanoid(10);
        //Create a unique password for this device. Should be validated against to make sure the user is valid.
        let uniquePassword = uuidv5(name, namespaces)

        // Create a new Microcontroller data in our database
        const newController = await Microcontroller.create({
            name: ControllerName,
            verification:uniquePassword
        });

        // return the new Controller data
        res.status(201).json(newController);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
