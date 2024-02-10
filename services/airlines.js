const db = require('./db');
const helper = require('../helpers/db-helper');
const config = require('../configurations/db-config');

async function getAll(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM airlines LIMIT ${offset},${config.listPerPage}`
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
        `SELECT * FROM airlines WHERE id=${id}`
    );
    const data = helper.emptyOrRows(result);

    return {data};
}

async function create(airline) {
    let logo_url = helper.valueOrNull(airline.logo_url)
    const result = await db.query(
        `INSERT INTO airlines (name, logo_url) VALUES
         ('${airline.name}', ${logo_url})`
    );
  
    let message = 'Error in creating airline';
  
    if (result.affectedRows) {
        message = 'Airline created successfully';
    }
  
    return {message};
}

async function update(id, airline){
    const result = await db.query(
        `UPDATE airlines 
        SET name="${airline.name}", logo_url="${airline.logo_url}"
        WHERE id=${id}`
    );

    let message = 'Error in updating airline';

    if (result.affectedRows) {
        message = 'Airline updated successfully';
    }

    return {message};
}

async function remove(id){
    const result = await db.query(
      `DELETE FROM airlines WHERE id=${id}`
    );
  
    let message = 'Error in deleting airline';
  
    if (result.affectedRows) {
        message = 'Airline deleted successfully';
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