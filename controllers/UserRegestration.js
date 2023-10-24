const User = require("../Schema/UserSchema");
const bcrypt = require('bcrypt');
const mailer = require('../middleware/nodeMailer');
const register = async (req, res) => {
    try {
        //generate otp
        const generateOTP = () => {
            return Math.floor(Math.random() * 90000) + 10000;
        };
        
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        
        if (existingUser) {
            return res.status(200).json({ message: 'Email already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const otp = generateOTP().toString();
        // Create a new user
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            otp: otp,
        });

        const email1= req.body.email;

        // Save the user to the database
        await newUser.save();
        mailer(email1, otp)

        res.status(201).json({ message: 'User Registered Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(error);
    }

}
module.exports = register;
