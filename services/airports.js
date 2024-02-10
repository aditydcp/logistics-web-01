const db = require('./db');
const helper = require('../helpers/db-helper');
const config = require('../configurations/db-config');

async function getAll(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM airports LIMIT ${offset},${config.listPerPage}`
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
        `SELECT * FROM airports WHERE id=${id}`
    );
    const data = helper.emptyOrRows(result);

    return {data};
}

async function create(airport) {
    const result = await db.query(
        `INSERT INTO airports 
         (name, code, city, country) VALUES
         ('${airport.name}', '${airport.code}',
         '${airport.city}', '${airport.country}')`
    );
  
    let message = 'Error in creating airport';
  
    if (result.affectedRows) {
        message = 'Airport created successfully';
    }
  
    return {message};
}

async function update(id, airport){
    const result = await db.query(
        `UPDATE airports 
        SET name="${airport.name}", code="${airport.code}",
        city="${airport.city}", country="${airport.country}"
        WHERE id=${id}`
    );

    let message = 'Error in updating airport';

    if (result.affectedRows) {
        message = 'Airport updated successfully';
    }

    return {message};
}

async function remove(id){
    const result = await db.query(
      `DELETE FROM airports WHERE id=${id}`
    );
  
    let message = 'Error in deleting airport';
  
    if (result.affectedRows) {
        message = 'Airport deleted successfully';
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