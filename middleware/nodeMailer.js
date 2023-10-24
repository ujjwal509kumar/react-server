const nodemailer = require("nodemailer");


const sendEmail = async (transporter, mailOptions) => {
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
        return info;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const mailer = async (email, otp) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "ujjwal509kumar@gmail.com",
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: "ujjwal509kumar@gmail.com",
        to: email,
        subject: "Your OTP",
        text: `Your OTP is ${otp}`,
    };

    await sendEmail(transporter, mailOptions);

}

module.exports = mailer;