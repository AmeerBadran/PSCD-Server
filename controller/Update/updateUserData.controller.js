const User = require('../../models/user.model');

const updateUserDataByAdmin = async (req, res) => {
    const userId = req.params.userId;
    let updates = req.body;

    if (typeof updates.birthDate === 'string') {
        updates.birthDate = JSON.parse(updates.birthDate);
    }
    console.log(updates);

    try {
        delete updates._id;
        delete updates.createdAt;
        delete updates.updatedAt;
        delete updates.__v;
        delete updates.password;
        delete updates.confPassword;
        delete updates.avatar;

        const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { updateUserDataByAdmin };