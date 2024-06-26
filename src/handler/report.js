const { reportService } = require("../usecase");
const { ErrConst } = require("../constant");

const Insert = async (req, res) => {
  try {
    let result = await reportService.Insert(req.body);
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
      message: "Report successfully created",
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
};
