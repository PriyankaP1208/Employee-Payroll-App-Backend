module.exports = (app) => {
	const user = require("../controller/controller.js");
<<<<<<< HEAD
	const employee = require("../controller/employee");
=======
>>>>>>> b027bc54fb2b5ea2d45793472191261c646dbc56

	app.post("/register", user.registerUser);

	app.post("/login", user.loginUser);
<<<<<<< HEAD

	app.post("/addEmployee", employee.createEmployee);

	app.get("/getEmployees", employee.getAllEmployees);

	app.get("/getById/:empId", employee.getOne);

	app.put("/updateById/:empId", employee.updateEmployee);

	app.delete("/deleteEmployee/:empId", employee.removeEmployee);
=======
>>>>>>> b027bc54fb2b5ea2d45793472191261c646dbc56
};