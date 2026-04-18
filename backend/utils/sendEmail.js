const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_FROM_EMAIL,
    to: options.email,
    subject: options.subject,
    html: options.html || options.message
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;