// utils/sendEmail.js
const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL, // your Gmail address
      pass: process.env.ADMIN_EMAIL_PASS, // your app password
    },
  });

  const mailOptions = {
    from: `"Delbite Team" <${process.env.ADMIN_EMAIL}>`,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
