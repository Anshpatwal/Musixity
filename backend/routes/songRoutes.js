const express = require('express')
const routes = express.Router()
const songController = require('../controller/songController')
const { protectedRoute, checkAdmin } = require('../middleware/authMiddleware')

routes.get('/', protectedRoute, checkAdmin, songController.getAllSongs)
routes.get('/featured', songController.featured)
routes.get('/madeforYou', songController.madeforYou)
routes.get('/trending', songController.trending)

module.exports = routes