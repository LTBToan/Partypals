const nodeMailer = require("nodemailer");
const emailVerify = require('email-verify');

exports.sendEmail = (emailData) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "clone6290@gmail.com",
      pass: "ydecendajntcafgz",
    },
  });
  return transporter
    .sendMail(emailData)
    .then((info) => console.log(`Message sent: ${info.response}`))
    .catch((err) => console.log(`Problem sending email: ${err}`));
};

exports.generateRandomPassword = (length) => {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
};

exports.checkEmail = (emailData) => {
  return new Promise((resolve, reject) => {
    emailVerify.verify(emailData, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info.success);
      }
    });
  });
};

