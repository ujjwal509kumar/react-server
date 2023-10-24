const User = require("../Schema/UserSchema");
const otpcheck = async (req, res) => {
    try {
        const { enteredemail, enterdotp } = req.body;

        const user = await User.findOne({ email: enteredemail });
        if (!user) {
            return res.status(400).json({ message: 'Email does not exixts' });
        }

        const dbotp = await User.find({email: enteredemail},{otp:1})
        let newdbotp = dbotp[0].otp;
        if(enterdotp.toString() == newdbotp.toString()){
            res.status(201).json({ message: 'Otp Verification Successfull' });
        }else{
            res.status(200).json({ message: 'Otp Verification Failed' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = otpcheck;