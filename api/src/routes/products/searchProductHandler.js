const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { product: { searchProduct } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        const { query: { q: query } } = req

        return searchProduct(query)
            .then(product => res.status(200).json(product))
    }, res, logger)
}