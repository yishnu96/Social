const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')
console.log("Routers");
router.get('/', homeController.home);
// router.get('/' , homeController.header)

module.exports = router;