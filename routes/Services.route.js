const express = require('express')
const router = express.Router()
const { transportOrder } = require('../controller/services/Transport.controller')
const { rentCarOrder } = require('../controller/services/RentCar.Controller')
const { rentLuxuryCarOrder } = require('../controller/services/RentLuxury.controller')
const { verifyToken } = require('../middleware/verifyToken');

router.post('/setTransportOrder', verifyToken, transportOrder);
router.post('/setRentCarOrder', verifyToken, rentCarOrder);
router.post('/setRentLuxuryCarOrder', verifyToken, rentLuxuryCarOrder);
module.exports = router