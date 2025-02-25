const express = require('express')

const routes = express.Router()

const albumController = require('../controller/albumController')

routes.get('/', albumController.allAlbums)

routes.get('/:id', albumController.singleAlbum)

module.exports = routes