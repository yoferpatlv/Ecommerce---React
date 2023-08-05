const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { product: { retrieveProducts } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        return retrieveProducts()
            .then(product => res.status(200).json(product))
    }, res, logger)
}