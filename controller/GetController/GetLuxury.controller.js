const LuxuryCars = require('../../models/luxuryCars.model');

const getLuxuryCars = async (req, res) => {
    try {
        const pageNumber = req.params.pageNumber;
        const perPage = 6;
        const skip = (pageNumber - 1) * perPage;

        if (pageNumber === '99999') {
            const luxuryCars = await LuxuryCars.find();
            res.status(200).json(luxuryCars);
        } else {
            const luxuryCars = await LuxuryCars.find().skip(skip).limit(perPage);
            res.status(200).json(luxuryCars);
        }

    } catch (error) {
        console.error("Error fetching luxury cars:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const luxuryCarCount = async (req, res) => {
    try {
        const count = await LuxuryCars.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getluxuryCarById = async (req, res) => {
    try {
        const carID = req.params.carID;
        const car = await LuxuryCars.findOne({ _id: carID });
        if (!car) {
            return res.status(404).json({ message: 'car not found' });
        }
        res.status(200).json({ car: car });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

module.exports = { getLuxuryCars, luxuryCarCount, getluxuryCarById };