const userController = require('../services/service.js');

class UserController {
    registerUser = (req, res) => {
        try {
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
