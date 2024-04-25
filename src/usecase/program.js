const { programRepo } = require("../repository");
const { ErrConst } = require("../constant");

const Insert = async (data) => {
  try {
    insertData = { ...data.body, created_by: data.user.email };
    await programRepo.Insert(insertData);
    return { data: data.name, error: null };
  } catch (error) {
    console.log(error);
    throw { data: null, error: error };
  }
};

const GetDetail = async (id) => {
  try {
    let result = await programRepo.GetByID(id);
    if (!result) {
      return { data: null, error: ErrConst.ErrorProgramNotFound };
    }
    return { data: result, error: null };
  } catch (error) {
    console.log(error);
    throw { data: null, error: error };
  }
};

module.exports = {
  Insert,
  GetDetail,
};
