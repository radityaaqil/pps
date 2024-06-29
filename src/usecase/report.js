const { reportRepo } = require("../repository");

const Insert = async (data) => {
  try {
    await reportRepo.Insert(data);
    return { data: data.program_id, error: null };
  } catch (error) {
    console.log(error);
    throw { data: null, error: error };
  }
};

module.exports = {
  Insert,
};
