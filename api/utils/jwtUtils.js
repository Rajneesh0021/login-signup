const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, {
    expiresIn: '12h',
  });
}

module.exports = { generateToken };