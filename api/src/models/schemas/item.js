const { Schema, Types: { ObjectId } } = require('mongoose')

const item = new Schema({
    product: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true,
        default: 1
    }
})

module.exports = item