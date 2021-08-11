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
            return res.send({ message: error.message })
        }
    }
}

module.exports = new UserController();
