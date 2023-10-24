const User = require("../Schema/UserSchema");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const forgottoken = async (req, res) => {
    const { forgotemail } = req.body;
    try {
        const oldUser = await User.findOne({ email: forgotemail });
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }

        const secret = (process.env.JWT_SECREAT + oldUser.password);
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
            expiresIn: "5m",
        });
        const link = `http://localhost:5000/forgotpass/${oldUser._id}/${token}`;
        console.log(link);
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "ujjwal509kumar@gmail.com",
                pass: process.env.MAIL_PASSWORD,
            },
        });

        var mailOptions = {
            from: "ujjwal509kumar@gmail.com",
            to: forgotemail,
            subject: "Password Reset",
            text: `Click on the link to reset your password ${link}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        return res.json({ status: "Email Sent" });
    } catch (error) {
        console.log(error);
    }
}
module.exports = forgottoken;