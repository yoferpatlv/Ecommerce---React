// import { User } from "../../../models";

// export async function registerAnonymousUser(cart) {
//     const user = await User.create({ cart })

//     if(user) {
//         return user._id.toString()
//     }
// }
// module.exports = registerAnonymousUser

const {User} = require('../../../models')
const {SystemError, BadRequestError} = require('errors')
const {validateCart}= require('validators')

function registerAnonymousUser(cart){
    debugger
    //validateCart => si !carrito o product.length <0  throw new BadREquestError('cart is empty')
    validateCart(cart)

    debugger
    return User.create({cart})
    .then(user=>{
        return user._id.toString()
    })
    .catch(error =>{
        if(error.code===400)
        throw new BadRequestError('cart is blank')
        
        debugger
    throw new SystemError(error.message)
    })
}

module.exports = registerAnonymousUser