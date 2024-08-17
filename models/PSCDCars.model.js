const mongoose = require('mongoose');

const PSCDCarsSchema = new mongoose.Schema({
    licensePlateNumber: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    yearOfManufacture: {
        type: Number,
        required: true
    },
    driverID: {
        type: String,
        required: true
    },
    driverName: {
        type: String,
        required: true
    },
    currentLocation: {
        type: {
            latitude: Number,
            longitude: Number
        },
        required: false
    },
    vehicleStatus: {
        type: String,
        enum: ['Available', 'On Trip', 'Under Maintenance'],
        required: true
    },
    fuelLevel: {
        type: Number,
        required: false,
        min: 0,
        max: 100
    },
    lastMaintenanceDate: {
        type: Date,
        required: false
    },
    passengerCapacity: {
        type: Number,
        required: true
    },
    fuelType: {
        type: String,
        enum: ['Petrol', 'Diesel', 'Electric'],
        required: true
    }
}, { timestamps: true });

const PSCDCars = mongoose.model('PSCDCars', PSCDCarsSchema);

module.exports = PSCDCars;
