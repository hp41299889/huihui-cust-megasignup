import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const sendMail = async (email: string) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "2024.4.30 童樂星遊記 報名成功！",
    text: `
    感謝報名「2024.4.30 童樂星遊記活動」！
    提醒您，要記得依您報名的人數，進行匯款繳費(每人$350元)，報名才算成功喔！
    匯款時，請備註「報名資料中的姓名」或回傳帳號末五碼給Line客服進行查帳！
    再次謝謝您！

    提醒您，此為系統信件，請勿回覆。
    `,
  };
  try {
    transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};
