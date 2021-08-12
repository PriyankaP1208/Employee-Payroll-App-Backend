const userService = require('../models/model.js');
const userHelper = require('../middleware/helper.js');

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
                const token = userHelper.generateAccessToken(loginDetails);
                return callback(null, token);
            });
        } catch (error) {
            return callback(error, null);
        }
    }
}
module.exports = new UserService();
