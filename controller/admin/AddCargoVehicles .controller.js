const CargoVehicles = require('../../models/cargoVehicles.model');

const AddCargoVehicles = async (req, res) => {
    try {
        const car = new CargoVehicles(req.body);
        await car.save();
        res.status(201).json('Data Added Successfuly');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const GetCargoVehicles = async (req, res) => {
    try {
        const pageNumber = req.params.pageNumber;
        const perPage = 6;
        const skip = (pageNumber - 1) * perPage;

        const allCargoVehicles = await CargoVehicles.find().skip(skip).limit(perPage);
        res.status(201).json(allCargoVehicles);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const CargoVehiclesCount = async (req, res) => {
    try {
        const count = await CargoVehicles.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getCargoVehiclesById = async (req, res) => {
    try {
        const carID = req.params.carID;
        const car = await CargoVehicles.findOne({ _id: carID });
        if (!car) {
            return res.status(404).json({ message: 'car not found' });
        }
        res.status(200).json({ car: car });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

module.exports = { AddCargoVehicles, GetCargoVehicles, CargoVehiclesCount, getCargoVehiclesById };