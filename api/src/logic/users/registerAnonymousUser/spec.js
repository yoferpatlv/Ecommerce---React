require('dotenv').config()

const { connect, disconnect } = require('mongoose')
const { User, Product, Item, Cart } = require('../../../models')
const { BadRequestError } = require('errors')
const registerAnonymousUser = require('.')

const { MONGO_URL_TEST } = process.env;

describe("registerAnonymousUser", () => {
    beforeAll(() => connect(MONGO_URL_TEST));

    beforeEach(() => Promise.all([User.deleteMany(), Product.deleteMany()])) //eliminar cada usuario

    it('succeds on new user anonymous', () => {  //happy path
        const product1 = new Product({
            name: 'airMax90',
            sku: 'nkh1144',
            price: 150,
            discount: 0,
            stock: 114,
            img:'https://i.postimg.cc/XJt6N71Q/169506285-136925785104495-7194486606775599435-n.jpg'
        })
        const product2 = new Product({
            name: 'techFleece',
            sku: 'nkh1444',
            price: 180,
            discount: 0,
            stock: 114,
            img:'https://i.postimg.cc/XJt6N71Q/169506285-136925785104495-7194486606775599435-n.jpg'
        })

        Promise.all([product1.save(), product2.save()])
            .then(([product1, product2]) => {
                const item1 = {
                    product: product1.id,
                    price: 300,
                    qty: 2
                }
                const item2 = {
                    product: product2.id,
                    price: 360,
                    qty: 2
                }
                //carrito
                debugger
                const cart = [item1, item2]
        
                return registerAnonymousUser(cart)
                    .then(res => {
                        //no espero un resultado por la tanto lo coloco como no definido
                        expect(res).toBeDefined()
                        //prometo el regreso de del email del usuario encontrado
                        return User.find()
                    })
                    .then(users => {
                        //espero que la longitud de users sea 1
                        expect(users).toHaveLength(1)
        
                        const [user] = users
        
                        expect(user.name).toBeUndefined()
                        expect(user.email).toBeDefined()
                        expect(user.password).toBeUndefined()
                    })
            })
    })

    it('fails on empty cart', () => {//unhappy path
        const cart = []

        // //con el metodo .create creamos usuario que nos retorna el parametro user
        // return User.create({ cart })
        //     .then(() => {
        // })

        try {
            return registerAnonymousUser(cart)
                .then(() => {
                    throw new Error('it should not reach this point')
                })
        } catch(error) {
            expect(error).toBeInstanceOf(BadRequestError)
            expect(error.message).toEqual('cart is empty')
        }
    })
    afterAll(() => disconnect())
})