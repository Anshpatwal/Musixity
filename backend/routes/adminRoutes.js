const express = require('express')
const routes = express.Router()
const adminController = require('../controller/adminController')
const authMiddleware = require('../middleware/authMiddleware');

routes.use(authMiddleware.protectedRoute, authMiddleware.checkAdmin);


routes.get('/checkAdmin', adminController.checkAdmin)

// Add Songs
routes.post('/songs', adminController.songs)

// Delete Songs
routes.delete('/songs/:id', adminController.deleteSong)

// Add Album
routes.post('/albums', adminController.createAlbum)

// Delete Album
routes.delete('/albums/:id', adminController.deleteAlbum)

module.exports = routes