import { AuthError, ClientError, ServerError, UnknownError } from 'errors'
import { validateCallback, validateNumber } from 'validators'
const API_URL = process.env.REACT_APP_API_URL

function addItemToCart(token, productId, price, qty,callback){
    
    //TODO agregar localstorage y cookies
    if (typeof token !== 'string') throw new TypeError('Token is not a string')
    if (token.trim().length === 0) throw new Error('Token is empty or blank')
    validateNumber(qty)
    validateNumber(price)
    validateCallback(callback)
    
    const xhr = new XMLHttpRequest();

    //response

    xhr.onload = function(){
        const status = xhr.status
        // const json = xhr.responseText

        // const {error} = JSON.parse(json)
        // console.log(json);
        switch(true) {
            case (status >= 500):
                callback(new ServerError(status))
                break
            case (status === 401):
                callback(new AuthError(status)) 
                break
            case (status >= 400): 
                callback(new ClientError(status)) 
                break
            case (status === 201):
                //callback(null)
                callback(null)
      
                break
            default:
                callback(new UnknownError(`unexpected status ${status}`))
        }
        
    }

    //request
    //TODO actualizar a POST, era PATCH
    xhr.open('POST', `${API_URL}/users/product/${productId}`);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.setRequestHeader('Content-type', 'application/json');

    const jsonItem = JSON.stringify({ price, qty });
    // const json = JSON.stringify({productId, price, qty})
    // debugger;
    xhr.send(jsonItem);
}

export default addItemToCart