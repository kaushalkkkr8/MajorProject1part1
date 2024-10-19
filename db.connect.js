const mongo = require('mongoose')
require("dotenv").config()

const mongoUri = process.env.MONGO

const data = async () => {
    try {
        const connection = await mongo.connect(mongoUri)
        if (connection) {
            console.log("Database Connected successfully")
        }
    } catch (error) {   
        console.error("UNable to connect", error)
    }
}
module.exports = { data }