const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.post('/', bookController.createBook); //Create book
router.get('/', bookController.listBooks);   //List books

module.exports = router;