const employeeService = require("../services/employee");
const validInput = require("../middleware/employeeValidation");

class EmployeeController {
	createEmployee(req, res) {
		const userInputValidation = validInput.validate(req.body);
		if (userInputValidation.error) {
			return res.status(400).send({
				success: false,
				message: "Enter valid details",
				data: req.body,
			});
		}
		
		const employee={
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			emailId: req.body.emailId,
			gender: req.body.gender,
			salary: req.body.salary,
			department: req.body.department
		};

		employeeService.createEmployee(employee, (error, newData) => {
			if(error)
			{
				return res.status(500).send({
					success:false,
					message:"Error occured",
					error:error.message
				});
			}
			res.status(201).send({
				success:true,
				data:newData,
				message:"Employee Created Successfully"
			});
		});
	}

	getAllEmployees(req, res){
		employeeService.getAllEmployees((error, empData) => {
			if(error){
				return res.status(500).send({
					success:false,
					message:"Some error occured",
				});
			}
			res.status(200).send({
				success:true,
				message:"Retrieved employee details",
				data: empData
			});
		});
	}

	getOne(req, res){
		const empId = req.params.empId;
		employeeService.getEmployeeById(empId, (error,empData) => {
			if(error)
			{
				return res.status(400).send({
					success:false,
					message:"Employee not found"
				});
			}else {
				return res.status(200).send({
					success:true,
					message:"Retrieved employee details",
					data: empData
				});
			}

		});
	}

	updateEmployee(req, res){
		const empId=req.params.empId;
		const updateDetails = {
			firstName:req.body.firstName,
			lastName:req.body.lastName,
			emailId:req.body.emailId,
			gender:req.body.gender,
			salary:req.body.salary,
			department:req.body.department
		};

		employeeService.updateEmployee(empId, updateDetails, (error, empData) => {
			return error ? res.status(500).send({
				success:false,
				message:error.message
			}):
				res.status(200).send({
					success:true,
					message:"Updated data successfully",
					data:empData
				});
		});
	}catch(error){
		return(error);
	}

	removeEmployee(req, res){
		try{
			const empId = req.params.empId;
			employeeService.reoveEmployee(empId, (error, empData) => {
				if(error){
					return res.status(500).send({
						success:false,
						message:"Employee not deleted"
					});
				}
				else {
					return res.status(200).send({
						success:true,
						message:"Deleted employee successfully",
						data:empData
					});
				}
			});
		}catch(error){
			return(error);
		}
	}
}

module.exports = new EmployeeController();