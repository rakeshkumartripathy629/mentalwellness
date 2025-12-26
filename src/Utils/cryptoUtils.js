const bcrypt = require("bcryptjs");

const hashValue = async (value) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(value, salt);
};

const compareHash = async (value, hash) => {
  return bcrypt.compare(value, hash);
};

module.exports = { hashValue, compareHash };
