const User = require("../Schema/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const login = async (req, res) => {
    try {
        const { loginemail, loginpassword } = req.body;

        const user = await User.findOne({ email: loginemail });
        if (!user) {
            return res.status(202).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(loginpassword, user.password);
        if (!isPasswordValid) {
            return res.status(200).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ loginemail }, process.env.JWT_SECREAT, {
            expiresIn: "10h",
        });
        // res.json({ message: 'Login successful' });
        res.status(201).json({ message: 'Login successfull', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = login;