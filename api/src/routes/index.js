const express = require('express')
const { Router, json } = express
const jsonBodyParser = json()
const { registerUserHandler, authenticateUserHandler, retrieveUserHandler, registerAnonymousUserHandler } = require('./users')
const { searchProductHandler, retrieveProductsHandler, retrieveProductExtendHandler } = require('./products')
const { addItemToCartHandler,updateCartHandler, removeItemFromCartHandler } = require('./cart')

const usersRouter = Router()

usersRouter.post('/users', jsonBodyParser, registerUserHandler)
usersRouter.post('/users-anonymous', jsonBodyParser, registerAnonymousUserHandler)

usersRouter.post('/users/auth', jsonBodyParser, authenticateUserHandler)

usersRouter.get('/users', retrieveUserHandler)
//===========================================
usersRouter.post('/users/product/:productId', jsonBodyParser, addItemToCartHandler)
usersRouter.patch('/users/cart/items/:itemId', jsonBodyParser, updateCartHandler);
usersRouter.delete('/users/cart/items/:itemId', removeItemFromCartHandler)


const productRouter = Router()
productRouter.get('/products/search', searchProductHandler)
productRouter.get('/products', retrieveProductsHandler)
productRouter.get('/products/:productId', retrieveProductExtendHandler)

module.exports = {
    usersRouter,
    productRouter
}