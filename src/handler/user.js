const { userService } = require("../usecase");
const { ErrConst } = require("../constant");

const Register = async (req, res) => {
  try {
    let user = await userService.Register(req.body);
    if (user == ErrConst.ErrorUsernameOrEmailHasBeenTaken) {
      return res.status(400).send({
        success: false,
        data: null,
        message: ErrConst.ErrorUsernameOrEmailHasBeenTaken,
      });
    }

    res.set("Authorization", `Bearer ` + user.token);
    return res.status(200).send({
      success: true,
      data: user.data,
      message: "Successfully registered",
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
  Register,
};
