const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:"String",
    email:"String",
    password:"String",
    role:{
        type:"String",
        default:"visitor"
    }
})

const userModel = new mongoose.model("User",userSchema)
module.exports = userModel
