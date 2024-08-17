const RentCar = require('../../models/rentcar.model');
const CarsForRent = require('../../models/carsForRent.model');
const User = require('../../models/user.model');

const rentCarOrder = async (req, res) => {
    try {
        const userID = req.userId;
        const { IDuser, licenseInfo, pickupDateTime, returnDateTime, durationOfRental, carId } = req.body;

        const userData = await getUserData(userID);
        const carData = await getCarData(carId);

        const userName = userData.username;
        const birthDay = userData.birthDate;
        const address = {
            country: userData.country,
            city: userData.city,
            moreInfo: userData.moreInfo
        }
        const phoneNumber = userData.phoneNumber;
        const email = userData.email;
        const carInformation = {
            carID: carData._id,
            carMake: carData.make,
            carModel: carData.model,
            carRentPerDay: carData.rentPerDay,
        };
        const newOrder = new RentCar({ userID, userName, birthDay, address, phoneNumber, email, IDuser, licenseInfo, pickupDateTime, returnDateTime, durationOfRental, carInformation, carInformation});

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
        return user;
    } catch (error) {
        return { error: error.message };
    }
};

const getCarData = async (carId) => {
    try {
        
        const car = await CarsForRent.findOne({ _id: carId });
        if (!car) {
            
            throw new Error("Car not found");
        }
        
        return car;
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = { rentCarOrder };