const nodemailer = require('nodemailer');

// firebase functions:config:set mail.host="smtp.gmail.com"
const mailTransport = nodemailer.createTransport({
  host: functions.config().mail.host,
  port: functions.config().mail.port || 587,
  secure: functions.config().mail.secure || false, // true for 465, false for other ports
  auth: {
    user: functions.config().mail.user,
    pass: functions.config().mail.password,
  },
});

async function sendMail(text) {
  if (!functions.config().mail) {
    return;
  }

  const mailOptions = {
    from: '"Rooster-on-the-sea" <>',
    to: user.email,
    subject: 'Welcome!',
    html: text,
  }

  // process the sending of this email via nodemailer
  await mailTransport.sendMail(mailOptions);
}

module.exports = {
  sendMail,
};
