const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const validatePassword = async (password, hash) => {
  const compare = await bcrypt.compare(password, hash);
  return compare;
};

module.exports = { hashPassword, validatePassword };