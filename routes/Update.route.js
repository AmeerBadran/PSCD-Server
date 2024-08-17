const express = require('express')
const router = express.Router()
const {updateUserDataByAdmin}=require('../controller/Update/updateUserData.controller')
const {updateCarForRentByAdmin}=require('../controller/Update/updateCarForRent.controller')
const {updateLuxuryCarsByAdmin}=require('../controller/Update/updateLuxuryCar.controller')
const {updateCargoVehiclesByAdmin}=require('../controller/Update/updateCargoVehicle.controller')
const {updatePSCDCarsByAdmin}=require('../controller/Update/updatePSCDCar.controller')
const { verifyAdminToken } = require('../middleware/verifyAdminToken');

router.put('/newUserData/:userId', verifyAdminToken, updateUserDataByAdmin );

router.put('/newCargoVehicle/:carID', verifyAdminToken, updateCargoVehiclesByAdmin );

router.put('/newPSCDCar/:carID', verifyAdminToken, updatePSCDCarsByAdmin );

router.put('/newLuxuryCar/:carID', updateLuxuryCarsByAdmin );

router.put('/newRentCar/:carID', verifyAdminToken, updateCarForRentByAdmin );

module.exports = router
