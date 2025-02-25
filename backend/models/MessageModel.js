const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const Message = mongoose.model('message', messageSchema)

module.exports = Message