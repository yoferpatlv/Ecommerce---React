const { User, Product, Item } = require('../../../models')
const { NotFoundError, SystemError } = require('errors')
const { verifyObjectIdString } = require('../../../utils')

// TODO Revisar

function updateCart(userId, productId,newPrice,newQty) {
    verifyObjectIdString(userId, 'user id')

    return User.findById(userId).populate('cart')
    .catch(error => {
        throw new SystemError(error.message);
    })
    .then(user => {
        if(!user) throw new NotFoundError('user with id ${userId} not found')
        if(!user.cart) throw new NotFoundError('cart not found for user with id ${userId}')

        const item = user.cart.items.find(item => item.product.toString() === productId)
        if(!item) throw new NotFoundError('item with product id ${productId} not found in the cart')

        //Actualizamos el precio y la cantidad del item en el carrito
        item.price = newPrice;
        item.qty = newQty;
        item.totalPrice = newPrice * newQty;

        return user.save();
    })
    .then(user => {});
}

module.exports = updateCart