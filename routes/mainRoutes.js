const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainController')

router.get('/', mainController.renderHome) 
router.post('/handleDrop', mainController.handleDrop)
router.get('/renderWritten',mainController.renderWritten)

module.exports = router

