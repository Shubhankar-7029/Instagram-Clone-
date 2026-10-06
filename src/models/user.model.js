const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already exists"]
  },
password: {
        type: String,
        required: [true, "Password is required"]
  },


email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"]
  },

bio : {
        type: String,
        default: "SHUBHANKAR"
  },

profileImage : {
        type: String,
        default: "https://ik.imagekit.io/vczfpgh3t/tiger-2535888_640.jpg"
  }

});



const userModel = mongoose.model('User', userSchema);

module.exports = userModel;