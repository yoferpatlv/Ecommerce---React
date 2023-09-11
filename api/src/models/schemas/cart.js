const item =require('./item')
const {Schema} = require('mongoose')

const cart = new Schema({
  items:[item],
  totalPriceAll: {
    type: Number,
    required: true,
    default: 0,
  },
})

module.exports = cart