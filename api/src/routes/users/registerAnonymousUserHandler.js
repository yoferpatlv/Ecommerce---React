const { runWithErrorHandling, createLogger } = require('../../utils')
const { users: { registerAnonymousUser } } = require('../../logic')
const { sign } = require('jsonwebtoken')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        const { body: { cart } } = req

        return registerAnonymousUser(cart)
            .then((userId) =>{ 
                 // Generar un token JWT para el usuario anónimo
                const token = sign({sub:userId},'Dan: copié el código de Mónica!', { expiresIn: '1h' })

                res.status(201).send({userId,token})})
            
    }, res, logger) //callback que envia 3 parametros
}