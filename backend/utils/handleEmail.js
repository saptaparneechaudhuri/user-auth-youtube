const nodemailer = require("nodemailer");

const sendEmailToResetPassword = async (options) => {
  // 1. Create a transporter to send the email. e.g. Gmail is a transporter
  // let transporter = nodemailer.createTransport({
  //   host: process.env.EMAIL_HOST,
  //   port: process.env.EMAIL_PORT,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: process.env.EMAIL_USERNAME, // generated ethereal user
  //     pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  //   },
  // });

  let transporter = nodemailer.createTransport({
    service: "SendinBlue",
    auth: {
      user: process.env.SENDINBLUE_USERNAME,
      pass: process.env.SENDINBLUE_PASSWORD,
    },
  });

  // 2. Set up the email options e.g. receivers, email body, subject etc and send the email
  let info = await transporter.sendMail({
    email: '"Admin" <sapta_ch@rediffmail.com>', // sender address
    to: options.email, // list of receivers
    from: "sapta_ch@rediffmail.com",
    subject: options.subject, // Subject line
    text: options.text, // plain text body
  });
};

module.exports = sendEmailToResetPassword;
