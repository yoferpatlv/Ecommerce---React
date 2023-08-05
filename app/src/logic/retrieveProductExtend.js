import { AuthError, ClientError, ServerError, UnknownError } from 'errors'
import { validateEmail, validatePassword, validateCallback } from 'validators'
const API_URL = process.env.REACT_APP_API_URL

function retrieveProductExtend(productId,callback){
    //TODO validate inputs
    // if (typeof token !== 'string') throw new TypeError('token is not a string')
    // if (token.trim().length === 0) throw new Error('token is empty or blank')

    //ARREGLAR
    validateCallback(callback)
   
    const xhr = new XMLHttpRequest

    //response

    xhr.onload = function(){
        const status = xhr.status
        const json = xhr.responseText
        const product =JSON.parse(json)
        const {error} = product

        
        switch(true) {
            case (status >= 500):
                callback(new ServerError(error))// ---> error de servidor.. 
                break
            case (status === 401):
                callback(new AuthError(error))// -----> errores de autenticacion 
                break
            case (status >= 400): 
                callback(new ClientError(error)) // ----> error de cliente
                break
            case (status === 200):
                   callback(null, product)
      
                break
            default:
                callback(new UnknownError(`unexpected status ${status}`))
        }
        
    }

    //request

    xhr.open('GET',`${API_URL}/products/${productId}`)

    xhr.send()
}

export default retrieveProductExtend