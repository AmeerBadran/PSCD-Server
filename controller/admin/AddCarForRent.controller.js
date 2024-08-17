const CarForRent = require('../../models/carsForRent.model');
const { uploadRentCarImage0 } = require('../../middleware/multerConfig');

const AddCarForRent = async (req, res) => {
    uploadRentCarImage0(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        const { make, model, year, mileage, color, seats, rentPerDay, available, features, rating, reviewsNumber } = req.body;
        const carImage = req.file ? req.file.filename : null;

        try {
            const newCar = new CarForRent({
                make,
                model,
                year,
                mileage,
                color,
                seats,
                rentPerDay,
                features,
                available,
                rating,
                reviewsNumber,
                carImage,
            });

            await newCar.save();

            res.status(201).json({ message: 'Car rental order created successfully', car: newCar });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });
};


module.exports = { AddCarForRent };