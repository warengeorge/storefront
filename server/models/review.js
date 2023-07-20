const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: false
    },
    userImage: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    review: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("Review", ReviewSchema)
