const { BadRequestError } = require('errors')

function validateCart(cart, explain = 'cart') {
    if (cart.items instanceof Array === false) throw new BadRequestError(`${explain} is not an array`)
    if (cart.items.length === 0) throw new BadRequestError(`${explain} is empty`)
}

module.exports = validateCart