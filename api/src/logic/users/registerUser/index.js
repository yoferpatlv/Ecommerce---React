const {User} = require('../../../models')
const{DuplicityError, SystemError} = require('errors')
const {validateText,validateEmail,validatePassword}= require('validators')

function registerUser(name,email,password,role){
    validateText(name,'name')
    validateText(role,'role')
    validateEmail(email)
    validatePassword(password)

    return User.create({name,email,password,role})
    // role:"client"
    .then(user=>{})
    .catch(error =>{
        if(error.code===11000)
        throw new DuplicityError('user already exists')

    throw new SystemError(error.message)
    })
}

module.exports = registerUser