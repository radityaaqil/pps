const bcrypt = require("bcrypt");

const HashPassword = async (inputPassword) => {
  const hash = await bcrypt.hash(inputPassword, 10);
  return hash;
};

const ComparePassword = async (inputPassword, storedPassword) => {
  const compare = await bcrypt.compare(inputPassword, storedPassword);
  return compare;
};

module.exports = {
  HashPassword,
  ComparePassword,
};
