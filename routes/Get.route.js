const express = require('express')
const router = express.Router()
const { getAvatar } = require('../controller/GetController/Getavatar.controller')
const { getCarsForRent, carsRentCount, getCarForRentById } = require('../controller/GetController/GetFromRentCars.controller')
const { getLuxuryCars, luxuryCarCount, getluxuryCarById } = require('../controller/GetController/GetLuxury.controller')
const { verifyToken } = require('../middleware/verifyToken');
const { verifyAdminToken } = require('../middleware/verifyAdminToken')
const { getUserByRole, usersCount, getUserData } = require('../controller/GetController/GetUsers.controller')
const { GetPSCDCars, PSCDCarsCount, getPSCDCarsById } = require('../controller/admin/AddPSCDCars.controller')
const { GetCargoVehicles, CargoVehiclesCount, getCargoVehiclesById } = require('../controller/admin/AddCargoVehicles .controller')

router.get('/avatar', verifyToken, getAvatar);

router.get('/rentCars/:pageNumber', verifyToken, getCarsForRent);
router.get('/rentCarsCount', verifyToken, carsRentCount);
router.get('/rentCarById/:carID', verifyToken, getCarForRentById);

router.get('/luxuryCars/:pageNumber', verifyToken, getLuxuryCars);
router.get('/luxuryCarsCount', verifyToken, luxuryCarCount);
router.get('/luxuryCarById/:carID', verifyToken, getluxuryCarById);

router.get('/users/:usersRole/:pageNumber', verifyAdminToken, getUserByRole);
router.get('/countUsers/:usersRole', verifyAdminToken, usersCount);
router.get('/userData/:userID', verifyToken, getUserData);

router.get('/PSCDCars/:pageNumber', verifyToken, GetPSCDCars);
router.get('/PSCDCarsCount', verifyToken, PSCDCarsCount);
router.get('/PSCDCarById/:carID', verifyToken, getPSCDCarsById);

router.get('/cargoVehicles/:pageNumber', verifyToken, GetCargoVehicles);
router.get('/cargoVehiclesCount', verifyToken, CargoVehiclesCount);
router.get('/cargoVehicleById/:carID', verifyToken, getCargoVehiclesById);

module.exports = router