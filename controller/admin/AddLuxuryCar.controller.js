const LuxuryCars = require('../../models/luxuryCars.model');
const { uploadRentCarImage0 } = require('../../middleware/multerConfig');

const AddLuxuryCar = async (req, res) => {
    uploadRentCarImage0(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        
        const carImage = req.file ? req.file.filename : null;

        const { make, model, year, mileage, color, seats, rentPerDay, available, features } = req.body;
        try {
            const newCar = new LuxuryCars({
                make,
                model,
                year,
                mileage,
                color,
                seats,
                rentPerDay,
                features,
                available,
                carImage: carImage,
            });

            await newCar.save();

            res.status(201).json({ message: 'Luxury Car added successfully', car: newCar });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });
};



module.exports = { AddLuxuryCar };