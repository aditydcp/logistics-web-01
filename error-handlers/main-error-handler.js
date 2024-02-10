const ErrorMessageMapper = require('../mappers/error-message-mapper')

const MainErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    let message = ErrorMessageMapper(err.message)
    res.status(statusCode).json({ message: message });
    return;
}

module.exports = MainErrorHandler