const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { cart: { addItemToCart} } = require('../../logic')
const logger = createLogger(module)


module.exports = (req, res) => {
    runWithErrorHandling(() => {
        const userId = verifyToken(req)

        const { params: { productId }, body: {qty, price} } = req

        return addItemToCart(userId, productId, price, qty)
            .then(() => res.status(201).send())
    }, res, logger)
}