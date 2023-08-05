const { runWithErrorHandling, createLogger } = require('../../utils')
const { users: { registerUser } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        const { body: { name, email, password,role } } = req

        return registerUser(name, email, password,role)
            .then(() => res.status(201).send())
            
    }, res, logger) //callback que envia 3 parametros
}