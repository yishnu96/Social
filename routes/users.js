const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const passport = require('passport');

router.get('/profile',passport.checkAuthentication,userController.profile);          //importing profile from user_controller
router.get('/signUp',userController.signUp);
router.get('/signIn',userController.signIn);
router.post('/create', userController.create)

router.post('/create-session',passport.authenticate(
    'local',{failureRedirect : '/users/signIn'}
),userController.createSession);

module.exports = router;