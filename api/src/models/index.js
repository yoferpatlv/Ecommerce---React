const { model } = require('mongoose')
const { address,cart,item,order,product,user} = require('./schemas')

module.exports = {
    Address: model('Address',address),
    Cart:model('Cart',cart),
    Item:model('Item',item),
    Order:model('Order',order),
    Product:model('Product',product),
    User: model('User', user)
}