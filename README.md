# Logistic-Web 01

This is a backend API service for logistic data.

**Tech stack:**
* Node.js
* Express
* MySQL

## Directory Structure
```
root
|-- configuration (Files related to app configuration)
|-- error-handlers (Express error handlers)
|-- mappers (Object-to-object mappers)
|-- middlewares (Components with specific functions used in some route handlers)
|-- routes (Router instances and route handlers)
|-- services (Services and functions used by route handlers)
```

## How to Run
**Install dependencies.** (Make sure you're using node.js version 16.x or higher).
```
npm install
```

**Configure environment variables (`.env` file)**
* `APP_PORT`: The port where the app will be hosted on (Default: 3000).
* `DB_HOST`: Address to the MySQL database host.
* `DB_USER`: Database username.
* `DB_PASSWORD`: Database user password.
* `DB_DATABASE`: Database to use from MySQL host.
* `DB_TIMEOUT`: Time limit for all database queries.
* `JWT_SECRET`: Secret key for `jsonwebtoken`.

**Start the server.**
```
npm start
```

*Aditya Cahyo*. 2024.