const CargoVehicles = require('../../models/cargoVehicles.model');

const updateCargoVehiclesByAdmin = async (req, res) => {
    const carID = req.params.carID;
    let updates = req.body;

    if (typeof updates.birthDate === 'string') {
        updates.birthDate = JSON.parse(updates.birthDate);
    }

    try {
        delete updates._id;

        const car = await CargoVehicles.findByIdAndUpdate(carID, updates, { new: true, runValidators: true });

        if (!car) {
            return res.status(404).json({ message: 'car not found' });
        }

        res.status(200).json({ message: 'car updated successfully', car });
    } catch (error) {
        console.error('Error updating car data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { updateCargoVehiclesByAdmin };