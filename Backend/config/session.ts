const {Sess_Sec} = process.env;

module.exports = {
    // Session secret should be set in the .env file. If no string is set, it will use the default below
    // This is only the default, and should not be used.
    secret: '',
    name: String(Sess_Sec) || 'WOTBackend',
    cookie: {
        secure: false,
    },
    resave: true,
    saveUninitialized: false,
}