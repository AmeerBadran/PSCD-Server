const PSCDCars = require('../../models/PSCDCars.model');

const AddPSCDCars = async (req, res) => {
    const { licensePlateNumber, model, yearOfManufacture, driverID, driverName, currentLocation, vehicleStatus, fuelLevel, lastMaintenanceDate, passengerCapacity, fuelType } = req.body;

    try {
        const newCar = new PSCDCars({
            licensePlateNumber,
            model,
            yearOfManufacture,
            driverID,
            driverName,
            currentLocation,
            vehicleStatus,
            fuelLevel,
            lastMaintenanceDate,
            passengerCapacity,
            fuelType,
        });

        await newCar.save();

        res.status(201).json({ message: 'Car rental order created successfully', car: newCar });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const GetPSCDCars = async (req, res) => {
    try {
        const pageNumber = req.params.pageNumber;
        const perPage = 6;
        const skip = (pageNumber - 1) * perPage;

        const allPSCDCars = await PSCDCars.find().skip(skip).limit(perPage);
        res.status(201).json(allPSCDCars);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const PSCDCarsCount = async (req, res) => {
    try {
        const count = await PSCDCars.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getPSCDCarsById = async (req, res) => {
    try {
        const carID = req.params.carID;
        const car = await PSCDCars.findOne({ _id: carID });
        if (!car) {
            return res.status(404).json({ message: 'car not found' });
        }
        res.status(200).json({ car: car });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

module.exports = { AddPSCDCars, GetPSCDCars, PSCDCarsCount, getPSCDCarsById };