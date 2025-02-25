const express = require('express')

const routes = express.Router()

const authRoute = require('../middleware/authMiddleware')

const authCtrll = require("../controller/authController")

routes.post('/callback', authRoute.protectedRoute, authCtrll.callback)

module.exports = routes