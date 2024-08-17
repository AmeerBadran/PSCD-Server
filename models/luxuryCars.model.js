const mongoose = require('mongoose');

const LuxuryCarsSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    rentPerDay: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    features: {
        type: [String],
    },
    rating: {
        type: Number,
        default: 0.0,
    },
    reviewsNumber: {
        type: Number,
        default: 0,
    },
    carImage: {
        type: String,
        required: false
    },
}, { timestamps: true });

const LuxuryCars = mongoose.model('LuxuryCars', LuxuryCarsSchema);

module.exports = LuxuryCars;