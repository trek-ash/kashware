const router = require('express').Router();
const {createThumbnail} = require("../utils/index")
const path = require("path")
const logger = require('../utils/logger');

router.post("/", async (req, res)=>{
    try{
        
        const {url} = req.body;
        if(!url)
            return res.status(400)
            .json({
                error: "Missing required field 'url'",
            })
        logger.info("Thumbnail creation started")
        const thumbnailDetails = await createThumbnail(url)
        logger.info("Thumbnail created successfully")
        // Sending image as a response

        // return res.sendFile("/"+thumbnailUrl,{
        //     root: path.join(__dirname, '../')
        // })
        
        // In case, just url of the image is required

        res.status(200)
            .json({
                thumbnail: thumbnailDetails
            })
    }catch(e)   {
        logger.error("Thumbnail creation failed")
        res.status(500)
            .json({
                error: "Something went wrong",
                message: e
            })
    }
    
})

module.exports = router