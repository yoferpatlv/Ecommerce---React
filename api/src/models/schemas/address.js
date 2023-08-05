const {Schema} = require('mongoose')

const address = new Schema({
  fullname:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  passport:{
    type:String,
    required:true
  }
})

module.exports = address