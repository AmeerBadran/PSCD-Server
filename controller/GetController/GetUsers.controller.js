const User = require('../../models/user.model');

const getUserByRole = async (req, res) => {
    try {
        const userRole = req.params.usersRole;
        const pageNumber = req.params.pageNumber;
        const perPage = 6;
        const skip = (pageNumber - 1) * perPage;

        const users = await User.find({ roles: userRole }).skip(skip).limit(perPage);

        if (!users) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ users: users });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const usersCount = async (req, res) => {
    try {
        const userRole = req.params.usersRole;
        const count = await User.countDocuments({ roles: userRole });
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getUserData = async (req, res) => {
    try {
        const userID = req.params.userID;
        const user = await User.findOne({ _id: userID });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user: user });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

module.exports = {
    getUserByRole,
    usersCount,
    getUserData
}