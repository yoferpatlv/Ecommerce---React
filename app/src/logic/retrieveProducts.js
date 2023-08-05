const API_URL = process.env.REACT_APP_API_URL
function retrieveProducts(callback){
    //TODO validate inputs
    // if (typeof token !== 'string') throw new TypeError('token is not a string')
    // if (token.trim().length === 0) throw new Error('token is empty or blank')

    //ARREGLAR
    if (typeof callback !== 'function') throw new TypeError('callback is not a function')
    
    const xhr = new XMLHttpRequest

    //response

    xhr.onload = function(){
        const status = xhr.status

        if(status>=500)
        callback(new Error(`Server error (${status})`))
        else if(status >=400)
        callback(new Error(`Client error retrieveProducts (${status})`))
        else if(status === 200){
            const json = xhr.responseText

            const products =JSON.parse(json)

            callback(null,products.reverse())
        }
    }

    //request

    xhr.open('GET',`${API_URL}/products`)

    xhr.send()
}

export default retrieveProducts