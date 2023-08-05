const express = require('express')
const { Router, json } = express
const jsonBodyParser = json()
const { registerUserHandler, authenticateUserHandler, retrieveUserHandler, registerAnonymousUserHandler } = require('./users')
const { searchProductHandler, retrieveProductsHandler, retrieveProductExtendHandler } = require('./products')
const { addItemToCartHandler, removeItemFromCartHandler } = require('./cart')

const usersRouter = Router()

usersRouter.post('/users', jsonBodyParser, registerUserHandler)
usersRouter.post('/users-anonymous', jsonBodyParser, registerAnonymousUserHandler)

usersRouter.post('/users/auth', jsonBodyParser, authenticateUserHandler)

usersRouter.get('/users', retrieveUserHandler)
usersRouter.patch('/users/product/:productId', jsonBodyParser, addItemToCartHandler)
usersRouter.delete('/users/item/:itemId', removeItemFromCartHandler)

// TODO usersRouter.patch('/users/email',jsonBodyParser,updateUserEmailHandler)
// TODO usersRouter.patch('/users/password',jsonBodyParser,updateUserPasswordHandler)
// TODO usersRouter.patch('/users/name',jsonBodyParser,updateUserNameHandler)


const productRouter = Router()
productRouter.get('/products/search', searchProductHandler)
productRouter.get('/products', retrieveProductsHandler)
productRouter.get('/products/:productId', retrieveProductExtendHandler)
// notesRouter.post('/notes', jsonBodyParser,createNoteHandler)
// notesRouter.get('/notes', retrieveNotesHandler)
// notesRouter.patch('/notes/:noteId', jsonBodyParser,updateNoteTextHandler)

module.exports = {
    usersRouter,
    productRouter
    // ,
    // notesRouter
}