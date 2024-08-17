const mongoose = require('mongoose');

const RentLuxurySchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    birthDay: {
        day:{
            type:Number,
        },
        month:{
            type:Number,
        },
        year:{
            type:Number,
        },
    },
    address: {
        country: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        moreInfo: {
            type: String,
            required: true,
        }
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    IDuser: {
        idType: {
            type: String,
            required: true,
        },
        idNumber: {
            type: String,
            required: true,
        }
    },
    licenseInfo: {
        licenseType: {
            type: String,
            required: true,
        },
        licenseNumber: {
            type: String,
            required: true,
        },
        firstIssuingDate: {
            type: Date,
            required: true,
        },
        expiryDate: {
            type: Date,
            required: true,
        }
    },
    pickupDateTime: {
        type: Date,
        required: true,
    },
    returnDateTime: {
        type: Date,
        required: true,
    },
    durationOfRental: {
        type: Number,
        required: true,
    },
    carInformation: {
        carID: {
            type: String,
            required: true,
        },
        carMake: {
            type: String,
            required: true,
        },
        carModel: {
            type: String,
            required: true,
        },
        carRentPerDay: {
            type: Number,
            required: true,
        }
    },
    driver: {
        type: Boolean,
        required: true,
        default: false,
    }
}, { timestamps: true });

const RentLuxury = mongoose.model("RentLuxuryCars", RentLuxurySchema);

module.exports = RentLuxury;
