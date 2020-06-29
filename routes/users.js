const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.get('/profile',userController.profile);          //importing profile from user_controller

module.exports = router;