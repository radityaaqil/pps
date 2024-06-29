const { activityRepo } = require("../repository");
const { ErrConst } = require("../constant");

const Insert = async (data) => {
  try {
    insertData = { ...data.body, created_by: data.user.email };
    await activityRepo.Insert(insertData);
    return { data: data.program_id, error: null };
  } catch (error) {
    console.log(error);
    throw { data: null, error: error };
  }
};

const Update = async (data) => {
  try {
    updateData = { ...data.body, updated_by: data.user.email };
    await activityRepo.Update(updateData, updateData.id);
    return { data: data.id, error: null };
  } catch (error) {
    console.log(error);
    throw { data: null, error: error };
  }
};

const AddAttachments = async () => {
  try {
  } catch (error) {
    console.log(error);
    throw { data: null, error: error };
  }
};

module.exports = {
  Insert,
  Update,
};
