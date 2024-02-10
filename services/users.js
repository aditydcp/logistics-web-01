const db = require('./db');
const helper = require('../helpers/db-helper');
const config = require('../configurations/db-config');

async function getAll(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM users LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function getOne(id) {
    const result = await db.query(
        `SELECT * FROM users WHERE id=${id}`
    );
    const data = helper.emptyOrRows(result);

    return {data};
}

async function create(user) {
    let password = helper.hashEncrypt(user.password)
    const result = await db.query(
        `INSERT INTO users 
         (name, email, password) VALUES
         ('${user.name}', ${user.email}, ${password})`
    );
  
    let message = 'Error in creating user';
  
    if (result.affectedRows) {
        message = 'User created successfully';
    }
  
    return {message};
}

async function update(id, user) {
    let password = helper.hashEncrypt(user.password)
    const result = await db.query(
        `UPDATE users 
        SET name="${user.name}", email="${user.email}",
        password="${password}"
        WHERE id=${id}`
    );

    let message = 'Error in updating user';

    if (result.affectedRows) {
        message = 'User updated successfully';
    }

    return {message};
}

async function remove(id) {
    const result = await db.query(
      `DELETE FROM users WHERE id=${id}`
    );
  
    let message = 'Error in deleting user';
  
    if (result.affectedRows) {
        message = 'User deleted successfully';
    }
  
    return {message};
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}