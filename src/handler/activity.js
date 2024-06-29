const { activityService } = require("../usecase");
const { ErrConst } = require("../constant");

const Insert = async (req, res) => {
  try {
    let result = await activityService.Insert(req);
    if (result.error) {
      return res.status(400).send({
        success: false,
        data: null,
        message: result.error,
      });
    }

    return res.status(200).send({
      success: true,
      data: result.data,
      message: "Activity successfully created",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: null,
      message: ErrConst.ErrorInternalServer,
    });
  }
};

const Update = async (req, res) => {
  try {
    req.body.id = req.params.id
    await activityService.Update(req.body);
    return res.status(200).send({
      success: true,
      data: null,
      message: "Activity successfully updated",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: null,
      message: ErrConst.ErrorInternalServer,
    });
  }
}

module.exports = {
  Insert,
  Update
};
