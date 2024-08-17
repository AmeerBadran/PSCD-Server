const mongoose = require('mongoose');

const CargoVehiclesSchema = new mongoose.Schema({
    licensePlateNumber: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        enum: ['Car', 'Truck', 'Van', 'Motorcycle'],
        required: true
    },
    make: {
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
    insuranceExpiryDate: {
        type: Date,
        required: true
    },
    fuelType: {
        type: String,
        enum: ['Petrol', 'Diesel', 'Electric'],
        required: true
    },
    cargoCapacity: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const CargoVehicles = mongoose.model('CargoVehicles', CargoVehiclesSchema);

module.exports = CargoVehicles;
