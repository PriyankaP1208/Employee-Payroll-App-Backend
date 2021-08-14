const express = require('express');
require('dotenv').config()
const logger = require('./config/logers.js');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json())

const dbConfig = require('./config/user.config.js');
dbConfig.dbConnection();

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Employee Payroll Application"});
    logger.info('Welcome to Employee Payroll Application');
});

require('./app/routes/route.js')(app);

// listen for requests
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
    logger.info('server is running on port 3000');
});

module.exports = app;