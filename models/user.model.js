const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter your username"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: 6,
    },
    phoneNumber: {
        type: String,
        required: [true, "Please enter your phone number"],
        match: [/^\+?[0-9]\d{1,14}$/, "Please enter a valid phone number"],
    },
    country: {
        type: String,
        required: [true, "Please enter your country"],
    },
    city: {
        type: String,
        required: [true, "Please enter your city"],
    },
    moreInfo: {
        type: String,
        required: [true, "Please provide more information"],
    },
    birthDate: {
        day: {
            type: Number,
            required: [true, "Please enter the day you were born"],
            min: 1,
            max: 31,
        },
        month: {
            type: Number,
            required: [true, "Please enter the month you were born"],
            min: 1,
            max: 12,
        },
        year: {
            type: Number,
            required: [true, "Please enter the year you were born"],
            min: 1900,
            max: new Date().getFullYear(),
        },
    },
    gender: {
        type: String,
        required: [true, "Please select your gender"],
        enum: ["male", "female"],
    },
    termsAccepted: {
        type: Boolean,
        required: [true, "You must accept the terms and conditions"],
    },
    roles: {
        type: [String],
        enum: ["user", "driver", "car_driver", "truck_driver", "admin", "super_admin"],
        default: ["user"],
    },
    avatar: {
        type: String,
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;
