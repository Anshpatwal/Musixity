const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)


const db = mongoose.connection

db.once('open', (error) => {
    if (error) {
        console.log(error)
    }
    console.log(`Database Connected`)
})

module.exports = db