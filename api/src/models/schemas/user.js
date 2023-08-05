const cart = require('./cart')
const { Schema } = require('mongoose')
// const { Cart } = require('../index') 

function randomEmail() {
    return `${Date.now()}-${Math.random()}@anonymous.mail`
}

const user = new Schema({
    name: String,
    // name:{
    //     type: String,
    //     // required: false
    // },
    email: {
        type: String,
        default: randomEmail,
        unique: true
    },
    password: {
        type: String
        // required: true
    },
    role: {
        type: String,
        enum: ['anonymous', 'client', 'admin'],
        // required:true,
        default: 'anonymous'
    },
    // cart
    cart
})

module.exports = user