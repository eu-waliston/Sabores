const nodemailer = require("nodemailer");

// Configuração do transporter (usando Gmail como exemplo)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Para produção, considere usar:
// - Amazon SES
// - SendGrid
// - Mailgun

const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: `"Recipe App" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};

module.exports = sendEmail;