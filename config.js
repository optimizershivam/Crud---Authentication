const mongoose = require("mongoose")
require("dotenv").config()
const connection = mongoose.connect(`mongodb+srv://${process.env.MONGO_KEY}:${process.env.MONGO_VALUE}@cluster0.7mukwmn.mongodb.net/authentication?retryWrites=true&w=majority`)

module.exports = {
    connection
}