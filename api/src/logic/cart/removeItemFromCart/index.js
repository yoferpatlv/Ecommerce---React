const { User, Product, Item } = require('../../../models')
const { NotFoundError, SystemError } = require('errors')
const { verifyObjectIdString } = require('../../../utils')
const calculateTotalPriceAll  = require('../calculatedTotalPriceAll.js')

// TODO REVISAR

function removeItemFromCart(userId, itemId) {
    verifyObjectIdString(userId, 'user id')

    return Promise.all([
        User.findById(userId).populate('cart'),
    ])
        .catch(error => {
            throw new SystemError(error.message)
        })

        .then(([user]) => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            const items = user.cart.items
            const itemFound = items.find(_item => _item._id.toString() === itemId)
            console.log(itemId)
            if (!itemFound) throw new NotFoundError(`item with id ${itemId} not found`)
            
            
            const updatedItems = items.filter(_item => _item.id.toString() !== itemId)

            user.cart.items = updatedItems
            
            // Recalcular el totalPriceAll
            const totalPriceAll = calculateTotalPriceAll(user.cart.items);
            user.cart.totalPriceAll = totalPriceAll;
            
            return user.save()
           
        })
        .then(user => { })
}

module.exports = removeItemFromCart