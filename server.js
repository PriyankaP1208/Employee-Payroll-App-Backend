const express = require("express");
require("dotenv").config();
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");
const logger = require("./config/logers");

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

app.use(
	"/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocument),
);

const dbConfig = require("./config/user.config");

dbConfig.dbConnection();

// define a simple route
app.get("/", (req, res) => {
	res.json("Welcome to Employee Payroll Application");
	logger.info("Welcome to Employee Payroll Application");
});

require("./app/routes/route")(app);

// listen for requests
app.listen(process.env.PORT, () => {
	console.log(`Server is listening on port ${process.env.PORT}`);
	// logger.info('server is running on port 3000');
});

module.exports = app;
