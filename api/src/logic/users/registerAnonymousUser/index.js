const {User} = require('../../../models')
const {SystemError, BadRequestError} = require('errors')
const {validateCart}= require('validators')

function registerAnonymousUser(cart){
    // TODO error cart is not an array, buscar el error y darle sentido ala logica
    //validateCart => si !carrito o product.length <0  throw new BadREquestError('cart is empty')

    validateCart(cart)
    
    return User.create({cart})   // Crear un usuario anónimo con el carrito proporcionado
    .then(user=>{
        return user._id.toString() // Devolver el ID del usuario creado
    })
    .catch(error =>{
        if(error.code===400)
        throw new BadRequestError('cart is blank')
        
        debugger
    throw new SystemError(error.message)
    })
}

module.exports = registerAnonymousUser