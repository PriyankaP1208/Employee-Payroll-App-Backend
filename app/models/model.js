const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

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
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
}, {
    timestamps: true
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
      if (err) return (err, null);
      this.password = hashedPassword;
      next();
    });
  });

const userModel = mongoose.model('users', UserSchema);

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

    userLogin=(loginDetails, callback) => {
        try {
        userModel.findOne({emailId: loginDetails.emailId}, (error, data) => {
            if(error) {
                return callback(error, null);
            } else if (!data) {
                return callback ("User doesn't exist", null);
            }
            else
                return callback(null, data);
            });
        }catch(error){
        return(error, null);
        }
    }
}

module.exports = new UserRegistrationAndLogin();