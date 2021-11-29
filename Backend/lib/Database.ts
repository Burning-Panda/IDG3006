export{};
const mongoose = require("mongoose");

const conf = require('../config/database.ts');

exports.connect = () => {
    // Connecting to the database
    mongoose
        .connect(conf.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        });
};