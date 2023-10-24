const User = require("../Schema/UserSchema");
const jwt = require("jsonwebtoken");

const profileInfo = async (req, res) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(' ')[1];
            let user = jwt.verify(token, process.env.JWT_SECREAT);

            if (user) {
                const profile = await User.findOne({ email: user.loginemail });
                // const profileemail = profile.email;
                // const profilename = profile.name;

                if (!profile) {
                    return res.status(404).json({ message: "Profile not found" });
                }
                return res.status(200).json({email: profile.email, name: profile.name});
            }
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = profileInfo;