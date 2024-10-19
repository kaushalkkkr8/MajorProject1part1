const mongo = require('mongoose')

const eComSchema = new mongo.Schema({
    image: {
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: String
    },
    name: {
        type: String
    },
    rating: {
        type: String
    },
    wishlist:{
        type :Boolean
    }
})
const ECommerce = mongo.model("eCommerce", eComSchema)
module.exports = ECommerce