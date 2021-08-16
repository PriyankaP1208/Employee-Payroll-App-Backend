module.exports = (app) => {
	const user = require("../controller/controller.js");

	app.post("/register", user.registerUser);

	app.post("/login", user.loginUser);
};