const userController = require("../services/service.js");
const validInput = require("../middleware/validation.js");
const logger = require("../../config/logers.js");

class UserController {
	registerUser(req, res){
		try {
			const userInputValidation = validInput.validate(req.body);
			if (userInputValidation.error) {
				logger.error("Invalid details");
				return res.status(400).send({
					success: false,
					message: "Enter valid details",
					data: req.body,
				});
			}

			const user = {
				firstName:req.body.firstName,
				lastName:req.body.lastName,
				emailId:req.body.emailId,
				password:req.body.password
			};
			userController.registerUser(user, (err, userData) => {
				if (err) {
					logger.error("Some error occured");
					return res.status(500).send({
						sucess:false,
						message: err.message || "Some error occurred"
					});
				}
				else
				{
					logger.info("User registered successfully");
					res.status(201).send({
						success:true,
						data:userData,
						message:"Registered Successfully"
					});
				}   
			});
		} catch (error) {
			logger.error("Some error occured");
			return res.status(500).send({
				success:false,
				message:error.message || "Some error occured",
			});
		}
	}

	loginUser(req, res){
		try {
			if(!req.body.password){
				return res.status(400).send({success:false,message:"Password can not be empty"});
			}
			const userDetails = ({
				emailId:req.body.emailId,
				password:req.body.password
			});

			userController.loginUser(userDetails, (err, data) => {
				return err ? res.status(400).send({success:false,message:"User not found"})
					: res.status(200).send({success:true,message:"Login Successful",data:data});
			});
		}catch(error) {
			return res.send({ message: error.message });
		}
	}
}

module.exports = new UserController();
