
const { FormatError, BadRequestError } = require('errors')

function validateProduct(Product, explain = 'Product') {
    // if (!Product) throw new BadRequestError(`${explain} not found`)
    if (Product.length === 0) throw new FormatError(`${explain} is empty or blank `)
}

module.exports = validateProduct