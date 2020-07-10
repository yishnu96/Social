const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')

console.log("Routers");

router.get('/', homeController.home);               //main home controller in controller folder
router.use('/users', require('./users'));       //send all /user router to user.js
router.use('/posts',require('./posts'));
router.use('/comments', require('./comments'));

module.exports = router;