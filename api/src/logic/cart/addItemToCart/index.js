const { User, Product, Item } = require('../../../models')
const { NotFoundError, SystemError } = require('errors')
const { verifyObjectIdString } = require('../../../utils')
const calculateTotalPriceAll  = require('../calculatedTotalPriceAll.js')
// TODO FALTA

function addItemToCart(userId, productId, price, qty) {
    verifyObjectIdString(userId, 'user id')

    return Promise.all([
        User.findById(userId).populate('cart'),
        Product.findById(productId)
    ])
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(([user, product]) => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)
            if (!product) throw new NotFoundError(`product with id ${productId} not found`)

            const totalPrice= price * qty; //Calculamos el totalPrice aqui
            const newItem = new Item({ product: productId, price, qty, totalPrice })

            if (user.cart) {
                const existingItemIndex = user.cart.items.findIndex(item => item.product.toString() === productId)

                if (existingItemIndex === -1) {
                    user.cart.items.push(newItem)
                } else {
                   // Si el producto ya existe en el carrito, actualizamos la cantidad, el precio y el total
                   const existingItem = user.cart.items[existingItemIndex];
                   existingItem.price = price;
                   existingItem.qty += qty;
                   existingItem.totalPrice = existingItem.price * existingItem.qty;
                }

                // calcular el totalPriceAll
                const totalPriceAll = calculateTotalPriceAll(user.cart.items);
                user.cart.totalPriceAll = totalPriceAll;

            } else {
               // Si no hay carrito, creamos uno nuevo con el nuevo elemento
               user.cart = { items: [newItem],totalPriceAll: totalPrice };
                // totalPriceAll se inicia con el precio del nuevo item
            }

            return user.save()
        })
        .then(user => { })

}

module.exports = addItemToCart