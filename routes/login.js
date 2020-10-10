const router = require('express').Router();
const jwt = require("jsonwebtoken")

const {secretKey} = require("../config")
const logger = require('../utils/logger');

router.post("/", async (req, res)=>{
    try{
        const {username, password} = req.body;
        if(!username || !password)
            return res.status(400)
                .json({
                    "Error": "Missing required fields!",
                    
                })

        const token = jwt.sign({
            data: username
          }, secretKey, { expiresIn: '1h' });

        logger.info("Token generated");

        return res.status(200)
            .json({
                token
            })
    }catch(e)   {
        return res.status(500)
            .json({
                error: "Something went wrong"
            })
    }
    
})

module.exports = router