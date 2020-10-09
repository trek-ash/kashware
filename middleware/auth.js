const jwt = require("jsonwebtoken")
const {secretKey} = require("../config")

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decoded = await jwt.verify(token, secretKey)
        res.locals.tokenInfo = decoded
        next()
    } catch (error) {
        res.status(401)
            .json({
                error: "Access denied"
            })
    }
    
}

module.exports = {verifyToken}