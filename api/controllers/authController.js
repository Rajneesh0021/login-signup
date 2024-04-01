
const jwtUtils = require('../utils/jwtUtils');
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

// signup users
exports.signup = async (req, res) => {
  try {
   
    
    const existingUser = await User.findOne({email: req.body.email });
// console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    });
  
    user.hashPassword();
  // Save profile image to local system

  // console.log(user)
  
    await user.save();

    // Generate JWT token
    const token = jwtUtils.generateToken(user);

    res.status(201).json({message:"user signed up successfully", token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.login = async (req, res) => {
  try {
   
    let user = await User.findOne({email:req.body.email});
    
    // console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwtUtils.generateToken(user);

    res.status(200).json({message:"User logged in successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
