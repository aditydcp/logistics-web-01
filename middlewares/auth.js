const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
    try {
        // get the token from the authorization header
        const token = await req.headers.authorization.split(" ")[1]

        // retrieve user info
        const user = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        
        req.user = user
        next()
    }
    catch (err) {
        console.error(`Error: Unauthorized request`, err.message);
        err.message = "Unauthorized request"
        err.statusCode = 401
        next(err);
    }
}