const User = require('../models/user.model')
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { uploadUserAvatar } = require('../middleware/multerConfig')

const signUp = async (req, res) => {
    uploadUserAvatar(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            let { username, email, password, phoneNumber, country, city, moreInfo, birthDate, gender, roles, termsAccepted } = req.body;
            const parsedBirthDate = JSON.parse(birthDate);

            if (!roles) {
                roles = 'user';
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            console.log('Request body:', req.body);
            console.log('Request file:', req.file);
            const hashedPassword = await bcrypt.hash(password, parseInt(process.env.HASH_PASS));

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                phoneNumber,
                country,
                city,
                moreInfo,
                birthDate: parsedBirthDate,
                gender,
                roles,
                termsAccepted,
                avatar: req.file ? req.file.filename : null
            });
            await newUser.save();

            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};

const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const accessToken = jwt.sign(
            { id: foundUser._id, email: foundUser.email },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            { id: foundUser._id, email: foundUser.email, roles: foundUser.roles[0] },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('pscdToken', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: 'Login successful',
            accessToken,
            userData: foundUser._id,
            userRole: foundUser.roles[0]
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const refresh = async (req, res) => {
    try {
        const refreshToken = req.cookies.pscdToken;
        if (refreshToken) {
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(406).json({ message: 'Unauthorized' });
                } else {
                    const accessToken = jwt.sign(
                        { id: decoded.id, email: decoded.email, roles: decoded.roles },
                        process.env.JWT_ACCESS_SECRET,
                        { expiresIn: '1h' }
                    );
                    return res.status(200).json({
                        message: 'Token refreshed successfully',
                        accessToken,
                        userData: decoded.id,
                        userRole: decoded.roles,
                    });
                }
            });
        } else {
            return res.status(406).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const logOut = (req, res) => {
    res.cookie('pscdToken', null, {
        httpOnly: true,
        secure: true,
        maxAge: 1,
    })
    res.status(200).json({ message: 'Logged out successfully' })
}


module.exports = {
    signUp,
    logIn,
    refresh,
    logOut
}