import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      //API key from sendgrid
      api_key: process.env.NEXT_PUBLIC_SENDGRID_API_KEY,
    },
  })
);

export default async function sendEmail(req, res) {
  const { email, subject, message, name } = req.body;

  try {
    await transporter.sendMail({
      to: email,
      from: "mail@zodiacai.net",
      html: message,
      name: name,
      subject: subject,
    });
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
