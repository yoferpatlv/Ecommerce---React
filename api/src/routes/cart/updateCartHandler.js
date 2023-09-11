const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { cart: { updateCart } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        const userId = verifyToken(req)

        const { params: { itemId }, body: { newPrice,newQty } } = req

        return updateCart(userId, itemId, newPrice,newQty) // Asume que tienes una función llamada updateCart
            .then(() => res.status(200).send())
            // Puedes cambiar el estado y el mensaje según tus necesidades
    }, res, logger)
}
