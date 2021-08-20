const mongoose = require("mongoose");
const logger = require("../../config/logers.js");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
	firstName:{
		type: String,
		required: true
	},
	lastName:{
		type:String,
		required:true
	},
	emailId:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	}
}, {
	timestamps: true,
	versionKey:false
});

UserSchema.pre("save", function (next) {
	bcrypt.hash(this.password, 10, (err, hashedPassword) => {
		if (err) return (err, null);
		this.password = hashedPassword;
		next();
	});
});

const userModel = mongoose.model("users", UserSchema);

class UserRegistrationAndLogin {
	addUser(userData, callback){
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

	userLogin(loginDetails, callback){
		try {
			userModel.findOne({emailId: loginDetails.emailId}, (error, data) => {
				if(error) {
					logger.error("Some error occured");
					return callback(error, null);
				} else if (!data) {
					logger.error("User not found");
					return callback ("User doesn't exist", null);
				}
				else
				{
					logger.info("EmailId is matched");
					return callback(null, data);
				}
			});
		}catch(error){
			return(error, null);
		}
	}
}

module.exports = new UserRegistrationAndLogin();