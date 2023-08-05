const { runWithErrorHandling, createLogger } = require('../../utils')
const { users: { registerAnonymousUser } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        const { body: { cart } } = req

        return registerAnonymousUser(cart)
            .then(() => res.status(201).send())
            
    }, res, logger) //callback que envia 3 parametros
}