const userController = require('../services/service.js');
const validInput = require('../middleware/validation.js');

class UserController {
    registerUser = (req, res) => {
        try {
            const userInputValidation = validInput.validate(req.body);
            if (userInputValidation.error) {
                return res.status(400).send({
                  success: false,
                  message: userInputValidation.error.details[0].message,
                  data: req.body,
                });
              }

            userController.registerUser(req.body, (err, userData) => {
                if (err) {
                    return res.status(500).send({
                        sucess:false,
                        message: err.message || "Some error occurred"
                    });
                }
                res.status(201).send({
                    success:true,
                    data:userData,
                    message:"Registered Successfully"
                });
            });

        } catch (error) {
            return res.send({ message: error.message });
        }
    }

    loginUser = (req, res) => {
        try {
            const userDetails = ({
                emailId:req.body.emailId,
                password:req.body.password
            });

            userController.loginUser(userDetails, (err, data) => {
                return err ? res.status(400).send({success:false,message:err})
                   : res.status(200).send({success:true,message:"Login Successful",data:data});
            });
        }catch(error) {
            return res.send({ message: error.message });
        }
    }
}

module.exports = new UserController();
