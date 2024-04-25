const { assignationRepo } = require("../repository");

const AssignProgram = async (program_id, user_ids) => {
  try {
    await assignationRepo.BulkInsert(program_id, user_ids);
    return { data: program_id, error: null };
  } catch (error) {
    console.log(error);
    throw { data: null, error: error };
  }
};

module.exports = {
  AssignProgram,
};
