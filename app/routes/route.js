module.exports = (app) => {
	const user = require("../controller/controller.js");
	const employee = require("../controller/employee");
	const helper = require("../middleware/helper");
	
	app.post("/register", user.registerUser);

	app.post("/login", user.loginUser);

	app.post("/addEmployee", helper.verifyToken, employee.createEmployee);

	app.get("/getEmployees", helper.verifyToken, employee.getAllEmployees);

	app.get("/getById/:empId", helper.verifyToken, employee.getOne);

	app.put("/updateById/:empId", helper.verifyToken, employee.updateEmployee);

	app.delete("/deleteEmployee/:empId", helper.verifyToken, employee.removeEmployee);
};