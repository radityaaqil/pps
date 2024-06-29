const { programRepo, activityRepo } = require("../repository");
const { ErrConst, ProgramConst } = require("../constant");

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

const Update = async (data, id) => {
  try {
    updateData = { ...data.body, updated_by: data.user.email };
    await programRepo.Update(updateData, id);
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

const StartProgram = async (id) => {
  try {
    await programRepo.UpdateStatus(ProgramConst.StartProgramStatus, id);
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    throw { data: null, error: error };
  }
};

const EndProgram = async (id) => {
  try {
    await programRepo.UpdateStatus(ProgramConst.EndProgramStatus, id);
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    throw { data: null, error: error };
  }
};

const GetList = async (keyword) => {
  try {
    let data = await programRepo.GetList(keyword);
    let result = [];
    for (let i = 0; i < data.length; i++) {
      let activities = await activityRepo.GetByProgramId(data[i].id);
      let totalActivities = 0;
      let totalFinished = 0;

      if (activities.length > 0) {
        for (let j = 0; j < activities.length; j++) {
          totalActivities += 1;
          if (activities[j].status == "FINISHED") {
            totalFinished += 1;
          }
        }
      }

      let value = Math.floor((totalFinished / totalActivities) * 100);
      let title = data[i].name;

      result.push({
        id: data[i].id,
        title: title,
        value: value > 0 ? value : 0,
      });
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
  StartProgram,
  EndProgram,
  GetList,
  Update,
};
