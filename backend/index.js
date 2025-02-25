const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const { clerkMiddleware } = require('@clerk/express')
const db = require('./config/db')
const fileUpload = require('express-fileupload')
const port = process.env.PORT
const path = require('path')
const app = express()
const cors = require('cors')
const http = require('http')
const cron = require("node-cron")
const fs = require('fs')
const { initilizeSocket } = require('./lib/socket')

const httpServer = http.createServer(app)

initilizeSocket(httpServer)

app.use(cors({
    origin: "https://musixity.onrender.com",
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded())
app.use(clerkMiddleware())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
}))

const tempDir = path.join(process.cwd(), "tmp")
cron.schedule("0 * * * *", () => {
    if (fs.existsSync(tempDir)) {
        fs.readdir(tempDir, (err, files) => {
            if (err) {
                console.log(err)
                return
            }
            for (const file of files) {
                fs.unlink(path.join(tempDir, file), (err) => {
 
                })
            }
        })
    }
})

//Routes

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/song', require('./routes/songRoutes'))
app.use('/api/album', require('./routes/albumRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/stats', require('./routes/statRoutes'))

if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
    })
}

app.use((err, req, res, next) => {
    res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message })
})

httpServer.listen(port, (err) => err ? console.log(err) : console.log(`Server Running on port :${port}`))