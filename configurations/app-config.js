const dotenv = require("dotenv")

dotenv.config()

const applicationConfig = {
    port: process.env.PORT || 3000
}

module.exports = applicationConfig;