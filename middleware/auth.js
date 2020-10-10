const jwt = require("jsonwebtoken")
const {secretKey} = require("../config")
const logger = require('../utils/logger');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        logger.info("Verifying token")
        const decoded = await jwt.verify(token, secretKey)
        res.locals.tokenInfo = decoded
        next()
    } catch (error) {
        logger.error("Token verification failed")
        res.status(401)
            .json({
                error: "Access denied"
            })
    }
    
}

module.exports = {verifyToken}