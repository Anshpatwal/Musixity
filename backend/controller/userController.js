const user = require("../models/UserModel")
const Message = require('../models/MessageModel')

module.exports.getusers = async (req, res) => {
    try {
        const currentUser = req.auth.userId
        const users = await user.find({ clerkId: { $ne: currentUser } })
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

module.exports.getMessages = async (req, res) => {
    try {
        const myId = req.auth.userId
        const { userId } = req.params

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userId },
                { senderId: userId, receiverId: myId }
            ]
        }).sort({ createdAt: 1 })
        return res.status(200).json(messages)

    } catch (error) {
        next(error)
    }
}