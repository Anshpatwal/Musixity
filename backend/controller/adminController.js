const album = require("../models/AlbumSchema")
const song = require("../models/SongSchema")
const cloudinary = require('../lib/cloudnairy')


// Check Admin

module.exports.checkAdmin = async (req, res, next) => {
    try {
        return res.status(200).json({ admin: true })
    } catch (error) {
        next(error)
    }
}

// Insert Songs and Images to Cloudnairy

const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto"
        })
        return result.secure_url
    } catch (error) {
        throw new Error(error)
    }
}


module.exports.songs = async (req, res, next) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({ message: "Please upload all Files" })
        }
        const { title, artist, duration, albumId } = req.body
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile
        
        const audioUrl = await uploadToCloudinary(audioFile)
        const imageUrl = await uploadToCloudinary(imageFile)

        const createSong = await song.create({
            title, artist, duration, albumId: albumId || null, audioUrl, imageUrl
        })

        if (albumId) {
            await album.findByIdAndUpdate(albumId, { $push: { songs: createSong._id } })
        }
        res.status(201).json(createSong)
    } catch (error) {
        next(error)
    }
}

module.exports.deleteSong = async (req, res, next) => {
    try {
        const id = req.params.id
        const songs = await song.findById(id)


        if (songs.albumId) {
            await album.findByIdAndUpdate(songs.albumId, {
                $pull: { songs: songs._id }
            })
        }

        await song.findByIdAndDelete(id)

        return res.status(200).json({ message: "Song deleted successfully" })
    } catch (error) {
        next(error)
    }
}


module.exports.createAlbum = async (req, res, next) => {
    try {
        const { title, artist } = req.body
        const { imageFile } = req.files
        const imageUrl = await uploadToCloudinary(imageFile)

        const newalbum = await album.create({ title, artist, imageUrl })

        return res.status(201).json({ message: "Album created Successfully", album: newalbum })
    } catch (error) {
        next(error)
    }
}


module.exports.deleteAlbum = async (req, res, next) => {
    try {
        const id = req.params.id
        await song.deleteMany({ albumId: id })
        await album.findByIdAndDelete(id)
        return res.status(200).json({ message: "Album deleted Successfully" })
    } catch (error) {
        next(error)
    }
}