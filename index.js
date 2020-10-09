const express = require('express');
const app = express()
const cors = require("cors")
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser')
const { verifyToken } = require('./middleware/auth');
require('dotenv').config();
// CORS
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use("/login", require("./routes/login"))
app.use("/jsonPatch", verifyToken, require("./routes/jsonPatch"))
app.use("/thumbnail", verifyToken, require("./routes/thumbnail"))
module.exports = app.listen(port, ()=>{
    console.log("Server started...")
})