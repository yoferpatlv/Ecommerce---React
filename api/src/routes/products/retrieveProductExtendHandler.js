const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { product: { retrieveProductExtend } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        // const productId=req.params.productId
        const {params:{productId}}=req
        return retrieveProductExtend(productId)
            .then(product => res.status(200).json(product))
    }, res, logger)
}