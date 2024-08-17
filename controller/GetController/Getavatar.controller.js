const User = require('../../models/user.model');

const getAvatar = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ avatar: user.avatar });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getAvatar,
}