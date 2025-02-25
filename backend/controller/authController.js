const user = require("../models/UserModel")


module.exports.callback = async (req, res,next) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body
        const checkUser = await user.findOne({ clerkId: id })

        if (!checkUser) {
            await user.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl
            })
        }
        console.log("yes")
        res.status(200).json({ success: true })

    } catch (error) {
        next(error)
    }
}