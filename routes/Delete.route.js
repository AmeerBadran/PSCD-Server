const express = require('express')
const router = express.Router()
const { deleteUser } = require('../controller/Delete/DeleteUser.Controller')
const { deleteCar } = require('../controller/Delete/DeleteCar.Controller')
const { verifyAdminToken } = require('../middleware/verifyAdminToken');

router.delete('/user/:userId', verifyAdminToken, deleteUser);

router.delete('/car/:carTable/:carID', verifyAdminToken, deleteCar);

module.exports = router
