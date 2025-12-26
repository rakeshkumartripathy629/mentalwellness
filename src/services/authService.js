const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/User");

const generateToken = (userId) =>
  jwt.sign({ id: userId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });

const registerUser = async ({ name, email, password }) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User already exists");

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);
  return { user, token };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await user.matchPassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user._id);
  return { user, token };
};

module.exports = { generateToken, registerUser, loginUser };
