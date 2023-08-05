const { User, Product, Item } = require('../../../models')
const { NotFoundError, SystemError } = require('errors')
const { verifyObjectIdString } = require('../../../utils')

// TODO FALTA

function updateCart(userId, productId) {
    // verifyObjectIdString(userId, 'user id')

    // return Promise.all([
    //     User.findById(userId).populate('cart'),
    //     Product.findById(productId)
    // ])
    //     .catch(error => {
    //         throw new SystemError(error.message)
    //     })
    //     .then(([user, product]) => {
    //         if (!user) throw new NotFoundError(`user with id ${userId} not found`)

    //         if (!product) throw new NotFoundError(`product with id ${productId} not found`)
    //         //TODO arreglar/
            
    //         return product.deleteOne({ productId })
    //         .catch((error) => {
    //             throw new systemError(error.message);
    //           });
    //         debugger
    //     })
    //     .then(user => { })
    // .then(([user, cart]) => {
    //     if (!user) throw new NotFoundError(`user with id ${userId} not found`)

    //     if (!cart) throw new NotFoundError(`cart with id ${cartId} not found`)

    //     // COMPROBAR QUE EL CART PERTENECE AL USUARIO

    //     return Item.create({ user: user._id })
    //         .catch(error => {
    //             throw new SystemError(error.message)
    //         })
    // })
    // .then(item => { })
}

module.exports = updateCart