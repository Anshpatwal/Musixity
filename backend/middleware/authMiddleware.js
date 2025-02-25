const { clerkClient } = require('@clerk/express')

module.exports.protectedRoute = async (req, res, next) => {
    if (!req.auth.userId) {
        return res.status(401).json({ message: "User must be Authenticated" })
    }
    next()
}
module.exports.checkAdmin = async (req, res, next) => {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin = process.env.ADMIN_MAIL === currentUser.primaryEmailAddress?.emailAddress;
    if (!isAdmin) {
        return res.status(401).json({ message: "Unauthorized - You must be an Admin" })
    }
    next()
}