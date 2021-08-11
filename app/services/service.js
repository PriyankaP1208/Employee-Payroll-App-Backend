const userService = require('../models/model.js');

class UserService {
    registerUser = (userData, callback) => {
        try {
            userService.addUser(userData, (error, data) => {
                return (error) ? callback(error, null) : callback(null, data);
            });
        } catch (error) {
            return callback(error, null);
        }
    }

    loginUser = (loginDetails, callback) => {
        try {
            userService.userLogin(loginDetails, (err, data) => {
                if(err)
                {
                    return callback(err, null);
                }
                else{
                    return callback(null, data);
                }
            });
        } catch (error) {
            return callback(error, null);
        }
    }
}
module.exports = new UserService();
