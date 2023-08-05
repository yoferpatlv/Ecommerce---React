const cart = require('./cart')
const address = require('./address')
const { Schema, Types: { ObjectId } } = require('mongoose')

const order = new Schema({
    user: {
        type: ObjectId,
        required: true
    },
    cart,
    date: {
        type: Date,
        required: true
    },
    paymentAddress: address,
    shippingAddress: address,
    paymentMethod: {
        type: String,
        enum: ['creditCard', 'paypal'],
        required: true
    }

})

module.exports = order