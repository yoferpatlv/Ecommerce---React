import { AuthError, ClientError, ServerError, UnknownError } from 'errors';
import { validateCallback } from 'validators'
const API_URL = process.env.REACT_APP_API_URL;

function removeItemFromCart(token, itemId, callback) {
    if (typeof token !== 'string') throw new TypeError('Token is not a string');
    if (token.trim().length === 0) throw new Error('Token is empty or blank');
    validateCallback(callback);

    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
        const status = xhr.status;
        switch (true) {
            case status >= 500:
                callback(new ServerError(status));
                break;
            case status === 401:
                callback(new AuthError(status));
                break;
            case status >= 400:
                callback(new ClientError(status));
                break;
            case status === 200:
                callback(null);
                break;
            default:
                callback(new UnknownError(`unexpected status ${status}`));
        }
    };

    xhr.open('DELETE', `${API_URL}/users/cart/items/${itemId}`);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.send();
}

export default removeItemFromCart;
