const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { cart: { removeItemFromCart} } = require('../../logic')
const logger = createLogger(module)


module.exports = (req, res) => {
    runWithErrorHandling(() => {
        const userId = verifyToken(req)

        const { params: { itemId } } = req

        return removeItemFromCart(userId, itemId)
            .then(() => res.status(200).send())
    }, res, logger)
}