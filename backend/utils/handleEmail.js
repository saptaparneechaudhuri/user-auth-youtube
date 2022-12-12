const nodemailer = require("nodemailer");
const pug = require("pug");

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.from = `Admin <sapta_ch@rediffmail.com`;
    this.url = url;
    this.name = user.name;
  }
  createTransporter() {
    if (process.env.NODE_ENV === "developement") {
      let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USERNAME, // generated ethereal user
          pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
      });
      return transporter;
    }

    if (process.env.NODE_ENV === "production") {
      let transporter = nodemailer.createTransport({
        service: "SendinBlue",
        auth: {
          user: process.env.SENDINBLUE_USERNAME,
          pass: process.env.SENDINBLUE_PASSWORD,
        },
      });
      return transporter;
    }
  }

  // function to send the email to reset password
  async sendEmailToResetPassword(template, emailOptions) {
    // 1. Render HTML based on the template provided

    // set path to the template file
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
      url: this.url,
      text: emailOptions.text,
      name: this.name,
    });

    // 2. Set the email options
    let mailOptions = {
      from: this.from,
      to: this.to,
      subject: emailOptions.subject,
      html: html,
    };
    // 3. Create a transport for sending email and also chan the sendMail function
    await this.createTransporter().sendMail(mailOptions);
  }
}

module.exports = Email;
