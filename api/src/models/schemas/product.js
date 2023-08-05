const {Schema} = require('mongoose')

const product = new Schema({
  name:{
    type:String,
    require:true
  },
  sku:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  discount:{
    type:Number,
    required: true,
    default:0
  },
  stock:{
    type: String,
    required:true
  },
  img:{
    type: String,
    required:true
  },
  type:{
    type:String,
    // required:true
  },
  categ:{
    type:String,
    // required:true
  },
  gallery:[ String],
  nivel:{
    type:Number
  }
  
})

module.exports = product