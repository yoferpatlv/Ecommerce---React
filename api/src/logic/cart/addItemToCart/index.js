const { User, Product, Item } = require('../../../models')
const { NotFoundError, SystemError } = require('errors')
const { verifyObjectIdString } = require('../../../utils')

// TODO FALTA

function addItemToCart(userId, productId, price, qty) {
    verifyObjectIdString(userId, 'user id')

    return Promise.all([
        User.findById(userId).populate('cart'),
        Product.findById(productId)
    ])
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(([user, product]) => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            if (!product) throw new NotFoundError(`product with id ${productId} not found`)

            const newItem = new Item({ product: productId, price, qty })

            if(user.cart) {
                const productIndex = user.cart.items.findIndex(item => item.product.toString() === productId)
                
                if(productIndex === -1) {
                    user.cart.items.push(newItem)
                } else {
                    user.cart.items[productIndex].qty = qty
                    user.cart.items[productIndex].price = price

                    // // user.cart.items[productIndex].qty = user.cart.items[productIndex].qty + qty

                    // user.cart.items[productIndex].qty += qty
                }

            } else {
                user.cart = {items: [newItem]}
            }

            return user.save()
        })
        .then(user => { })
   
}

module.exports = addItemToCart