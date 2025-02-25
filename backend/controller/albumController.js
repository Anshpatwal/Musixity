const album = require("../models/AlbumSchema")

module.exports.allAlbums = async (req, res,next) => {
    try {
        const albums = await album.find()
        return res.status(200).json(albums)
    } catch (error) {
        next(error)
    }
}

module.exports.singleAlbum = async (req, res, next) => {
    try {
        const id = req.params.id
        const singleAlbum = await album.findById(id).populate("songs")
        if (singleAlbum) {
            return res.status(200).json(singleAlbum)
        } else {
            return res.status(400).json({ message: "Album not found" })
        }
    } catch (error) {
        next(error)
    }
}