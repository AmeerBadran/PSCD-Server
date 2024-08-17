const mongoose = require('mongoose');

const TransSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    numberOfBoxes: {
        type: String,
        required: true,
    },
    servicetype: {
        type: String,
        required: [true, "Please fill your service type field"]
    },
    addressFrom: {
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
    addressTo: {
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
        match: [/^\d{10}$/, "Please fill a valid phone number"]
    }
}, { timestamps: true });

const TransModel = mongoose.model("TransModel", TransSchema);

module.exports = TransModel;
