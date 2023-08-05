const { Product } = require('../../../models')
const { NotFoundError, SystemError } = require('errors')
// const { verifyObjectIdString } = require('../../../utils')
const { validateString } = require('validators')

function searchProduct(query) {
    // verifyObjectIdString(product, 'product')
    validateString(query)

    // return Product.find({name:{$regex: new RegExp(query)}}).lean()

    
    return Product.find({name:{$regex: new RegExp(`(?:^|\\s)(${query}\\w*)`), $options: 'i'}}).lean()
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(products => {
            // console.log(products)
            if (!products) throw new NotFoundError(`product with ${query} characters does not exist`)
            
            products.forEach(product => {
                
                product.id = product._id.toString()
                delete product._id
                // delete product.sku
                delete product.__v
            })

            return products
        })
}

module.exports = searchProduct