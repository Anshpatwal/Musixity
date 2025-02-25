const album = require("../models/AlbumSchema")
const song = require("../models/SongSchema")
const user = require("../models/UserModel")

module.exports.totalSongs = async (req, res) => {
    try {
        const [totalSongs, totalUser, totalAlbums, uniqueArtist] = await Promise.all([
            song.countDocuments(),
            user.countDocuments(),
            album.countDocuments(),
            song.aggregate([
                {
                    $unionWith: {
                        coll: "albums",
                        pipeline: []
                    }
                },
                {
                    $group: {
                        _id: '$artist'
                    }
                },
                {
                    $count: 'count'
                }
            ])
        ])

        res.status(200).json({ totalAlbums, totalSongs, totalArtist: uniqueArtist[0]?.count || 0, totalUser })

    } catch (error) {
        next(error)
    }
}