const { userRepo } = require("../repository/index");
const { ErrConst } = require("../constant");
const { bcrypt, myCache, jwtAuth, email } = require("../helper");

const Register = async (userData) => {
  try {
    // Check user
    let user = await userRepo.GetByNameOrEmail(userData.name, userData.email);
    if (user.rows.length) {
      return ErrConst.ErrorUsernameOrEmailHasBeenTaken;
    }

    // Hash password
    let hashedPassword = await bcrypt.HashPassword(userData.password);
    userData.password = hashedPassword;

    // Insert to DB
    await userRepo.Insert(userData);

    // Caching and token
    let timecreated = new Date().getTime();
    const dataToken = {
      name: userData.name,
      email: userData.email,
      role: "USER",
      timecreated,
    };

    let caching = myCache.set(userData.email, dataToken, 300);
    if (!caching) {
      throw "Caching failed";
    }

    //Create Token Access and Token Email
    const tokenAccess = jwtAuth.SignJWT(dataToken, "1h");
    const tokenEmail = jwtAuth.SignJWT(dataToken, "30m");

    //Send email
    let templateDir = "../templates/verification.html";
    let title = "Verify it's you!";
    let route = "verification";
    await email.SendEmail(userData, tokenEmail, templateDir, title, route);

    return {
      data: { username: userData.name, email: userData.email },
      token: tokenAccess,
    };
  } catch (error) {
    throw error;
  }
};

const VerifyAccount = async (userData) => {
  userData.is_verified = true;
  try {
    await userRepo.Update(userData);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  Register,
  VerifyAccount,
};
