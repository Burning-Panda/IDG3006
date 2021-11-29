# Project Title

A brief description of what this project does and who it's for


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`

or create 2 files in a folder called `config`
The first file will be `database.ts` and should contain the following variables:
```Javascript
module.exports = {
    uri:"<MongoDB connection URI>",
    // Validates the initialization password before they are "registered" in the DB
    controlPassword:"<Security PASSWORD>",
    namespace:"<Secure name for this project>",
}
```
The second file will be `session.ts`.
```Javascript
const {SESSION_secret} = process.env;

module.exports = {
    // Session secret should be set in the .env file. If no string is set, it will use the default below
    // This is only the default, and should not be used.
    secret: '',
    name: String(SESSION_secret) | 'WOTBackend',
    cookie: {
        secure: false,
    },
    resave: true,
    saveUninitialized: false,
}
```


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Run as development server with typescript support
```bash
npm run start:dev
```
