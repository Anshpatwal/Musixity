const socketIo = require('socket.io')
const Message = require('../models/MessageModel')


module.exports.initilizeSocket = (server) => {
    const io = new socketIo.Server(server, {
        cors: {
            origin: "https://musixity.onrender.com",
            credentials: true
        }
    })

    const userSockets = new Map()
    const userActivity = new Map()

    io.on('connection', (socket) => {

        socket.on('user_connected', (userId) => {
            userSockets.set(userId, socket.id)
            userActivity.set(userId, "Idle")
            io.emit('user_connected', userId)
        })

        //brodcast to all users 

        socket.emit('users_online', Array.from(userSockets.keys()))

        io.emit("activites", Array.from(userActivity.keys()))

        socket.on("update_activity", ({userId, activity}) => {
            userActivity.set(userId, activity)
            io.emit('activity_updated', { userId, activity })
        })

        socket.on('send_message', async (data) => {
            try {
                const { senderId, receiverId, content } = data
                console.log(senderId, receiverId, content)
                const message = await Message.create({ senderId, receiverId, content })

                const recieverSocketId = userSockets.get(receiverId)

                if (recieverSocketId) {
                    io.to(recieverSocketId).emit('recieved_message', (message))
                }

                socket.emit('sent_message', (message))

            } catch (error) {
                console.log(error)
            }
        })

        socket.on('disconnect', () => {
            let disconnected;
            for (const [userId, socketId] of userSockets.entries()) {
                if (socketId == socket.id) {
                    disconnected = userId
                    userSockets.delete(userId)
                    userActivity.delete(userId)
                }
            }
            if (disconnected) {
                io.emit('user_disconnected', disconnected)
            }
        })

    })
}