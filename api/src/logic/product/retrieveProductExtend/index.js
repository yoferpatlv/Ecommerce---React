const { User, Product } = require('../../../models')
const { NotFoundError, SystemError } = require('errors')
// const { verifyObjectIdString } = require('../../../utils')

function retrieveProductExtend(productId) {
    // verifyObjectIdString()

    return Product.findById(productId).lean()
        .catch(error => {
            throw new NotFoundError(error.message)
        })
        .then(product => {
                //sanitize
                product.id = product._id.toString()
                delete product._id
                delete product.__v
                
                return product
            })
}

module.exports = retrieveProductExtend