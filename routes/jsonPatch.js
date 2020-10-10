const router = require('express').Router();
const jsonpatch = require('jsonpatch')
const logger = require('../utils/logger');

router.patch("/", async (req, res)=>{
    try{
        const {json, json_patch} = req.body;
        
        
        if(!json || !json_patch)
            return res.status(400)
                    .json({
                        message: "Missing required fields"
                    })
        logger.info("JSON Patch started");
        const patchedResult = jsonpatch.apply_patch(json, json_patch);
        logger.info("JSON Patch success");
        
        return res.status(200)
            .json({
                patchedResult
            })
    }catch(e)   {
        logger.info("Patch failed");
        res.status(500)
            .json({
                error: "Something went wrong",
                message: e
            })
    }
    
})

module.exports = router