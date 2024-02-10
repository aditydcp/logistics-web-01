const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usersService = require('./users')
const CreateException = require('../helpers/error-helper')

async function login(credentials) {
    const { email, password } = credentials

    let userAccount

    const data = await usersService.getOneByEmail(email)
        .then((user) => {
            console.log(user)
            if (user.data.length === 0) {
                throw CreateException("Authentication failed", 401)
            }
            else {
                userAccount = user.data
                return bcrypt.compare(password, userAccount.password)
            }
        })
        .then((response) => {
            if (!response) {
                throw CreateException("Authentication failed", 401)
            }
            else {
                let token = jwt.sign(
                    {
                        userId: userAccount.id,
                        email: userAccount.email
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1h"
                    }
                )
                return ({
                    accessToken: token,
                    userId: userAccount.id,
                })
            }
        })

    return data
}

module.exports = {
    login
}