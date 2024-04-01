const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true, 
    maxlength: 80 
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
 createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.hashPassword = function () {
  this.password = bcrypt.hashSync(this.password, 10);
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;