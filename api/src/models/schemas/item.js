const { Schema, Types: { ObjectId } } = require('mongoose')

const item = new Schema({
    product: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },
    // name:{
    //     type: String,
    //     required: true
    // },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true,
        default: 1
    },
    totalPrice:{
        type: Number,
        required: true,
    }
})

module.exports = item