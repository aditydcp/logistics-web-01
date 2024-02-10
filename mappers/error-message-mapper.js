const ErrorMessageMapper = (errorMessage) => {
    if (errorMessage.includes("connect ECONNREFUSED")) {
        return "Database connection failed"
    }
    return errorMessage
}

module.exports = ErrorMessageMapper