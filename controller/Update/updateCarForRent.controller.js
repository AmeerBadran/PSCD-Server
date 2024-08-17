const CarForRent = require('../../models/carsForRent.model');
const { uploadRentCarImage0 } = require('../../middleware/multerConfig');

const updateCarForRentByAdmin = async (req, res) => {
    uploadRentCarImage0(req, res, async (err) => {
        if (err) {
            console.error('Error uploading file:', err.message);
        }

        const carID = req.params.carID;
        let updateData = req.body;

        // إضافة مسار الصورة إذا تم تحميلها بنجاح
        if (req.file) {
            updateData.imagePath = req.file.path;
        }

        try {
            const updatedCar = await CarForRent.findByIdAndUpdate(carID, updateData, { new: true });
            if (!updatedCar) {
                return res.status(404).send({ message: 'Car not found' });
            }
            res.json({ message: 'Car Data Updated', updatedCar });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
};

module.exports = { updateCarForRentByAdmin };