const item =require('./item')
const {Schema} = require('mongoose')

const cart = new Schema({
  items:[item]
})

module.exports = cart