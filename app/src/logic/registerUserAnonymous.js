import { validateCart, validateCallback } from 'validators'
const API_URL = process.env.REACT_APP_API_URL

function registerUserAnonymous(cart, callback) {
    // TODO validate inputs
    validateCart(cart)

    validateCallback(callback)

    //XMLHttpRequest nos permite hacer peticiones a un servidor web y obtener las respuestas que este envia
    const xhr = new XMLHttpRequest

    //response

    //el metodo onload se lanza cuando una transacción XMLHttpRequest se completa con éxito
    xhr.onload = function () {
        const status = xhr.status
        const json = xhr.responseText

        const { error, token } = JSON.parse(json)
        
        if (status >= 500)
            callback(new Error(`server error(${error})`))
        else if (status >= 400)
            callback(new Error(`client error(${error})`))
        else if (status === 201)
            callback(null,token)
    }

    //request

    //el metodo open es para crear una conexion con el servidor remoto(iniciarlizar la conexion) 
    xhr.open('POST', `${API_URL}/users-anonymous`)

    //el metodo setRequestHeader establece el valor de un encabezado de solicitud HTTP. Debe llamar después de open(), pero antes de send().setRequestHeader()
    xhr.setRequestHeader('Content-type', 'application/json')

    const json = JSON.stringify({ cart });
    //el metodo send es para el envio de la solicitud al servidor
    xhr.send(json)
}

// registerUser("jose fer", "jose@fer.com", "123123123", console.log)
export default registerUserAnonymous