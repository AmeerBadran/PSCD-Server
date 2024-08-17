const CarForRent = require('../../models/carsForRent.model');

const getCarsForRent = async (req, res) => {
    try {
        const perPage = 6;
        const pageNumber = parseInt(req.params.pageNumber);
        const lowerBound = (pageNumber - 1) * perPage;

        const rentCars = await CarForRent.find().skip(lowerBound).limit(perPage);
        res.status(200).json(rentCars);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const carsRentCount = async (req, res) => {
    try {
        const count = await CarForRent.countDocuments();

        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getCarForRentById = async (req, res) => {
    try {
        const carID = req.params.carID;
        const car = await CarForRent.findOne({ _id: carID });
        if (!car) {
            return res.status(404).json({ message: 'car not found' });
        }
        res.status(200).json({ car: car });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

module.exports = { getCarsForRent, carsRentCount, getCarForRentById };