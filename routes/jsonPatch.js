const router = require('express').Router();
const jsonpatch = require('jsonpatch')
router.post("/", async (req, res)=>{
    try{
        const {json, json_patch} = req.body;
        
        
        if(!json || !json_patch)
            return res.status(400)
                    .json({
                        message: "Missing required fields"
                    })
        
        const patchedResult = jsonpatch.apply_patch(json, json_patch);
        return res.status(200)
            .json({
                patchedResult
            })
    }catch(e)   {
        res.status(500)
            .json({
                error: "Something went wrong",
                message: e
            })
    }
    
})

module.exports = router