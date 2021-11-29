const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet')
const session = require('express-session')
const { SESSION_secret } = process.env;
const cors = require('cors')


// Import configs
const config = {
    session: require('./config/session'),
    database: require('./config/database.ts'),
};


/* ######################## *\
 * Import pages for routing *     <---------------------------------
\* ######################## */

const // Default routes.
    pingRouter  = require('./routes/ping'),
    indexRouter = require('./routes/index.ts');
    //usersRouter = require('./routes/users'),
    // inputRouter = require('./routes/input');


const // Get Specific pages - Open pages, no "security".
    //get_User = require('./routes/get/User.ts'),
    get_Plant = require('./routes/get/Plants.ts'),
    get_Measurements = require('./routes/get/Measurements.ts'),
    get_Single_Measurement = require('./routes/get/SingleMeasurement.ts'),
    get_SinglePlant = require('./routes/get/SinglePlant.ts'),
    get_CurrentMeasurement = require('./routes/get/CurrentMeasurement.ts'),
    get_TaskFromPlants = require('./routes/get/GetTasks.ts');


const // POST new data - Any pages used often and only requires mild security.
    new_Plants = require('./routes/post/Plant.ts'),
    new_Measurements = require('./routes/post/Measurements.ts'),
    new_NewUser = require('./routes/post/NewUser.ts');

const // Update tasks - Any pages used often and only requires mild or higher security.
    UpdateTasks = require('./routes/update/Tasks.ts');


//const // Secure routing - Any pages that requires higher security.
    //register_Microcontroller = require('./routes/microcontroller'),
    //register_New_User = require('./routes/microcontroller');

// User Routing
const validate_New_User = require('./routes/users/validateUser.ts');



/* ############# *\
 * App settings  *     <------------------------------------------
\* ############# */

// Set app as "express"
const app = express();


if (SESSION_secret) {config.session.secret = String(SESSION_secret);}
// Config for Production environment
if (app.get('env') === 'production') {
    productionCheckConfig();                // Check all settings
    app.set('trust proxy', 1);              // trust first proxy
    config.session.cookie.secure = true;    // serve secure cookies
}



const corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods', 'X-CSRF-Token'],
    exposedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods', 'X-CSRF-Token'],
    preflightContinue: true
};


/* ################## *\
 * Express extensions *    <-----------------------------------------------
\* ################## */

// Extend expressJS with 'addons'

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(session(config.session));       // Set the session config
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


/* ####### *\
 * Routing *
\* ####### */
//app.use('/', indexRouter);

// Default routes
app.use('/ping', pingRouter);

// Get
//app.use('/users', usersRouter);
app.use('/get/Measurements', get_Measurements);
app.use('/get/Plants', get_Plant);
app.use('/get/Plant', get_SinglePlant);
app.use('/get/Measurement/latest', get_CurrentMeasurement);
app.use('/get/Task', get_TaskFromPlants)

// Post
app.use('/add/Measurements', new_Measurements);
app.use('/add/NewUser', new_NewUser);
app.use('/add/Plant', new_Plants);

// Update
app.use('/set/Task', UpdateTasks)


// User routing
app.use('/user/', validate_New_User);


// Finally, export the app so it can be used by WWW file
module.exports = app;


/** Checks the settings to see if every required variable is set and stops the program if it isn't. */
function productionCheckConfig() {
    if (!SESSION_secret) console.error("Missing Session Secret!\n Please a secret key to a variable called \"SESSION_secret\" in the .env file.");
    process.exit(1);
}
