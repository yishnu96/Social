const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.get('/profile',userController.profile);          //importing profile from user_controller
router.get('/signUp',userController.signUp);
router.get('/signIn',userController.signIn);
router.post('/create', userController.create)

module.exports = router;