const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization

        if(!token){return res.status(400).json(`you are not authorised`)}

        const parsedToken = token.replace("Bearer ", "")
        const validToken = verifyJwt(parsedToken, process.env.JWT_SECRET)
        const userLogued = await User.findById(validToken.id)
        const userRole = userLogued.role

        if(userRole === "admin"){
            userLogued.password = null;
            next()
        } else {
            return res.status(400).json(`you are not an admin`)
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json(`you are not an admin`)
    }
}

module.exports = { isAdmin }