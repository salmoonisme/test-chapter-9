const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers/userController');
const userController = new UserController();


router.get('/user', userController.register);
router.get('/user/verify', userController.verify);
router.post('/user/tweet', userController.tweet)

module.exports = router;