const { assignationService } = require("../usecase");
const { ErrConst } = require("../constant");

const AssignProgram = async (req, res) => {
  try {
    let { program_id, user_ids } = req.body;
    let result = await assignationService.AssignProgram(program_id, user_ids);
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
      message: "Program successfully assigned",
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
  AssignProgram,
};
