const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName:{
        type: String,
        require: true
    },
    lastName:{
        type:String,
        require:true
    },
    emailId:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
}, {
    timestamps: true
});

const userModel = mongoose.model('User', UserSchema);

class UserRegistrationAndLogin {
    addUser=(userData, callback)=> {
        try{
            const user = new userModel({
                firstName: userData.firstName,
                lastName: userData.lastName,
                emailId: userData.emailId,
                password: userData.password
            });
            user.save((error, userData) => {
                return (error) ? callback(error, null) : callback(null, userData);
            });
        } catch (error) {
            return (error, null);
        }
    }
}

module.exports = new UserRegistrationAndLogin();