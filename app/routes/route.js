module.exports = (app) => {
	const user = require("../controller/controller.js");
	const employee = require("../controller/employee");

	app.post("/register", user.registerUser);

	app.post("/login", user.loginUser);

	app.post("/addEmployee", employee.createEmployee);

	app.get("/getEmployees", employee.getAllEmployees);

	app.get("/getById/:empId", employee.getOne);

	app.put("/updateById/:empId", employee.updateEmployee);

	app.delete("/deleteEmployee/:empId", employee.removeEmployee);
};