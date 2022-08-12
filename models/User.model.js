const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:String,
    password: String,
    age: Number
})

const UserModel = mongoose.model("user",userSchema)

module.exports = {
    UserModel
}