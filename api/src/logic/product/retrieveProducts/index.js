const { User, Product } = require('../../../models')
const { NotFoundError, SystemError } = require('errors')
// const { verifyObjectIdString } = require('../../../utils')

function retrieveProducts() {
    // verifyObjectIdString()

    return Product.find({ }).lean()
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(products => {
            //sanitize
            products.forEach(product => {
                product.id = product._id.toString()
                delete product._id
                delete product.__v
                
            })
            return products
        })
}

module.exports = retrieveProducts