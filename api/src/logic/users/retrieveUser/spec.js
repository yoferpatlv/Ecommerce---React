require('dotenv').config()

const { connect, disconnect, Types:{ObjectId} } = require('mongoose')
const { User } = require('../../../models')
const { NotFoundError} = require('errors')
const retrieveUser  = require('.')

const { MONGO_URL_TEST } = process.env;

describe("retrieveUser", () => {
  beforeAll(() => connect(MONGO_URL_TEST));

    beforeEach(() => User.deleteMany()) //eliminar cada usuario

    it('succeeds on existing user', () => {//happy path
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

        //con el metodo .create creamos usuario que nos retorna el parametro user
        return User.create({ name, email, password })
            .then(user => {
                return retrieveUser(user.id)
                    .then(user => {
                        expect(user).toBeDefined()
                        expect(user.name).toEqual(name)
                        expect(user.email).toEqual(email)
                        expect(user.password).toBeUndefined()
                    })
            })

    })
    it('fails on non-existing user', () => {//unhappy path
        const userId= new ObjectId().toString()

        //con el metodo .create creamos usuario que nos retorna el parametro user
        return retrieveUser(userId)
            .catch(error => {
                expect(error).toBeInstanceOf(NotFoundError)
                expect(error.message).toEqual(`user with id ${userId} not found`)
            })

    })

    afterAll(() => disconnect())
})