const { User } = require('../../../models')
const { NotFoundError, SystemError } = require('errors')
const { verifyObjectIdString } = require('../../../utils')
const calculateTotalPriceAll  = require('../calculatedTotalPriceAll.js')

function updateCart(userId, itemId, newPrice, newQty) {
    verifyObjectIdString(userId, 'user id')

    return User.findById(userId).populate('cart')
        .catch(error => {
            throw new SystemError(error.message);
        })
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)
            if (!user.cart) throw new NotFoundError(`cart not found for user with id ${userId}`)

            const item = user.cart.items.find(item => item._id.toString() === itemId)
            if (!item) throw new NotFoundError(`item with id ${itemId} not found in the cart`)

            // Actualizamos el precio y la cantidad del item en el carrito
            item.price = newPrice;
            item.qty = newQty;
            item.totalPrice = newPrice * newQty;


            // Recalcular el totalPriceAll
            const totalPriceAll = calculateTotalPriceAll(user.cart.items);
            user.cart.totalPriceAll = totalPriceAll;

            return user.save();
        })
        .then(user => {});
}

module.exports = updateCart;
