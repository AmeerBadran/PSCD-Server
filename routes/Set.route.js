const express = require('express')
const router = express.Router()
const { AddCarForRent } = require('../controller/admin/AddCarForRent.controller')
const { AddLuxuryCar } = require('../controller/admin/AddLuxuryCar.controller')
const { AddPSCDCars } = require('../controller/admin/AddPSCDCars.controller')
const { AddCargoVehicles } = require('../controller/admin/AddCargoVehicles .controller')
const { verifyAdminToken } = require('../middleware/verifyAdminToken');

router.post('/addCarForRent', verifyAdminToken, AddCarForRent);

router.post('/addLuxuryCar', verifyAdminToken, AddLuxuryCar);

router.post('/addPSCDCar', verifyAdminToken, AddPSCDCars);

router.post('/addCargoVehicle', verifyAdminToken, AddCargoVehicles);

module.exports = router
