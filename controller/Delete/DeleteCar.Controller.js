const LuxuryCars = require('../../models/luxuryCars.model');
const CarForRent = require('../../models/carsForRent.model');
const PSCDCars = require('../../models/PSCDCars.model');
const CargoVehicles = require('../../models/cargoVehicles.model');

const deleteCar = async (req, res) => {
    const carId = req.params.carID;
    const carTable = req.params.carTable;
    let deletedCar;

    try {
        if (carTable === 'luxuryCar') {
            deletedCar = await LuxuryCars.findByIdAndDelete(carId);
        } else if (carTable === 'rentCar') {
            deletedCar = await CarForRent.findByIdAndDelete(carId);
        } else if (carTable === 'PSCDCar') {
            deletedCar = await PSCDCars.findByIdAndDelete(carId);
        } else if (carTable === 'cargoVehicle') {
            deletedCar = await CargoVehicles.findByIdAndDelete(carId);
        }

        if (!deletedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }

        res.status(200).json({ message: 'Car deleted successfully', car: deletedCar });
    } catch (error) {
        console.error('Error deleting car:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { deleteCar };