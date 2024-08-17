const Transport = require('../../models/transport.model');
const User = require('../../models/user.model');

const transportOrder = async (req, res) => {
    try {
        const userID = req.userId;
        let { userName, phoneNumber, servicetype, addressFrom, addressTo, numberOfBoxes } = req.body;

        if (addressFrom.city==="empty") {
            
            const userData = await getUserData(userID);
            if (!userData.error) {
                addressFrom = userData;
            }
        }

        if (addressTo.city==="empty") {
            const userData = await getUserData(userID);
            if (!userData.error) {
                addressTo = userData;
            }
        }

        const newOrder = new Transport({ userID, userName, phoneNumber, servicetype, addressFrom, addressTo, numberOfBoxes });

        await newOrder.save();
        res.status(201).json({ message: 'Order successfully saved!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUserData = async (userID) => {
    try {
        const user = await User.findOne({ _id: userID });
        if (!user) {
            throw new Error("User not found");
        }
        const { country, city, moreInfo } = user;
        return { country, city, moreInfo };
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = { transportOrder };
