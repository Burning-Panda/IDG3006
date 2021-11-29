module.exports = {
    apps : [
        {
            name            : 'express-api',
            script          : './API/app.js',
            watch           : '.',
            instances       : 1,
            exec_mode       : "cluster",
            env             : {
                "NODE_ENV": "production"
            },
            max_memory_restart: "60M"
        },{
            name            : 'wot-backend',
            cwd             : './IDG3006/',
            script          : 'npm run serve',
            watch           : '.',
            instances       : 1,
            exec_mode       : "cluster",
            max_memory_restart: "80M"
    }],
};

