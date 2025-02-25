const express = require('express')

const routes = express.Router()

const userCtrll = require("../controller/userController")
const { protectedRoute } = require('../middleware/authMiddleware')

routes.get('/', protectedRoute, userCtrll.getusers)

routes.get('/messages/:userId',protectedRoute,userCtrll.getMessages)

module.exports = routes