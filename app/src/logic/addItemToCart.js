import { AuthError, ClientError, ServerError, UnknownError } from 'errors'
import { validateCallback, validateNumber } from 'validators'
const API_URL = process.env.REACT_APP_API_URL

function addItemToCart(token, productId, price, qty,callback){
    //TODO validate inputs
    
    //TODO agregar localstorage y cookies
    if (typeof token !== 'string') throw new TypeError('Token is not a string')
    if (token.trim().length === 0) throw new Error('Token is empty or blank')
    validateNumber(qty)
    validateNumber(price)
    validateCallback(callback)
    
    const xhr = new XMLHttpRequest

    //response

    xhr.onload = function(){
        const status = xhr.status
        const json = xhr.responseText

        const { error, token } = JSON.parse(json)
        debugger
        switch(true) {
            case (status >= 500):
                callback(new ServerError(error))
                break
            case (status === 401):
                callback(new AuthError(error)) 
                break
            case (status >= 400): 
                callback(new ClientError(error)) 
                break
            case (status === 200):
                   callback(null)
      
                break
            default:
                callback(new UnknownError(`unexpected status ${status}`))
        }
        
    }

    //request

    xhr.open('PATCH',`${API_URL}/users/product/${productId}`)
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.setRequestHeader('Content-type', 'application/json')

    const json = JSON.stringify({ price, qty})
    // const json = JSON.stringify({productId, price, qty})

    xhr.send(json)
}

export default addItemToCart