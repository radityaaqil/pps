const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");

const SendEmail = async (userData, tokenEmail, templateDir, title, route) => {
  try {
    //Nodemailer
    let transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    //Email
    const host =
      process.env.NODE_ENV === "production" ? "" : "http://localhost:8080";
    const link = `${host}/${route}/${tokenEmail}`;

    let filepath = path.resolve(__dirname, templateDir);

    let htmlString = fs.readFileSync(filepath, "utf-8");

    const template = handlebars.compile(htmlString);

    const htmlToEmail = template({ username: userData.name, link });

    //Send Email
    await transporter.sendMail({
      from: `Verification <${process.env.EMAIL_USER}>`,
      to: userData.email,
      subject: title,
      html: htmlToEmail,
    });
    return { success: true, data: null, message: "Email successfully sent" };
  } catch (error) {
    console.log(error);
    throw new Error(error || "Network Error");
  }
};

module.exports = {
  SendEmail,
};
