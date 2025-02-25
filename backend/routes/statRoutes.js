const express = require('express')

const routes = express.Router()

const statController = require('../controller/statController')
const { protectedRoute, checkAdmin } = require('../middleware/authMiddleware')

routes.get('/', protectedRoute, checkAdmin, statController.totalSongs)

module.exports = routes