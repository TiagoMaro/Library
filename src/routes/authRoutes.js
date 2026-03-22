const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//Register route: POST http://localhost:3000/api/auth/register
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;