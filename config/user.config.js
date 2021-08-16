require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("./logers");

exports.dbConnection = () => {
	mongoose.Promise = global.Promise;

	const url = process.env.URL;

	// Connecting to the database
	mongoose.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	}).then(() => {
		console.log("Successfully connected to the database");
	}).catch((error) => {
		console.log("Could not connect to the database. Exiting now...", error);
		logger.error("Could not connect to the database");
		process.exit();
	});

	return mongoose.connection;
};
