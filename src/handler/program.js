const { programService } = require("../usecase");
const { ErrConst } = require("../constant");

const Insert = async (req, res) => {
  try {
    let result = await programService.Insert(req);
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
      message: "Program successfully created",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: null,
      message: ErrConst.ErrorInternalServer,
    });
  }
};

const GetDetail = async (req, res) => {
  try {
    let result = await programService.GetDetail(req.params.id);
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
      message: "Program detail successfully fetched",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: null,
      message: ErrConst.ErrorInternalServer,
    });
  }
};

module.exports = {
  Insert,
  GetDetail,
};
