const song = require("../models/SongSchema")

module.exports.getAllSongs = async (req, res, next) => {
    try {
        const allSongs = await song.find().sort({ createdAt: -1 })
        if (allSongs) {
            return res.status(200).json(allSongs)
        } else {
            return res.status(400).json({ message: "Something went Wrong" })
        }
    } catch (error) {
        next(error)
    }
}

module.exports.featured = async (req, res, next) => {
    try {
        const featuredSongs = await song.aggregate([
            {
                $sample: { size: 6 }
            }, {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1
                }
            }
        ])
        if (featuredSongs) {
            return res.status(200).json(featuredSongs)
        } else {
            return res.status(400).json({ message: "Something went Wrong" })
        }
    } catch (error) {
        next(error)
    }
}

module.exports.madeforYou = async (req, res, next) => {
    try {
        const madeforYou = await song.aggregate([
            {
                $sample: { size: 4 }
            }, {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1
                }
            }
        ])
        if (madeforYou) {
            return res.status(200).json(madeforYou)
        } else {
            return res.status(400).json({ message: "Something went Wrong" })
        }
    } catch (error) {
        next(error)
    }
}

module.exports.trending = async (req, res, next) => {
    try {
        const trendingSongs = await song.aggregate([
            {
                $sample: { size: 4 }
            }, {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1
                }
            }
        ])
        if (trendingSongs) {
            return res.status(200).json(trendingSongs)
        } else {
            return res.status(400).json({ message: "Something went Wrong" })
        }
    } catch (error) {
        next(error)
    }
}
