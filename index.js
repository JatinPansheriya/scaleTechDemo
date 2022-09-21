const express = require("express");
const fileUpload = require("express-fileupload");
const config=require("./config/config");
const dbConfig=require("./config/db.config");
const router = require("./routes/routes");
const app =express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload());
app.use("/",router)

const PORT = config.PORT ? config.PORT : 3000;
app.listen(PORT, function (err) {
    if (err) {
        console.log("Error in server setup");
    }
    console.log("Server listening on Port", PORT);
})