const db = require('./db');
const helper = require('../helpers/db-helper');
const config = require('../configurations/db-config');

async function getAll(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM importers LIMIT ${offset},${config.listPerPage}`
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
        `SELECT * FROM importers WHERE id=${id}`
    );
    const data = helper.emptyOrRows(result);

    return {data};
}

async function create(importer) {
    let address = helper.valueOrNull(importer.address)
    let contact = helper.valueOrNull(importer.contact)
    let logo_url = helper.valueOrNull(importer.logo_url)
    const result = await db.query(
        `INSERT INTO importers 
         (name, address, contact, logo_url) VALUES
         ('${importer.name}', ${address}, ${contact}, ${logo_url})`
    );
  
    let message = 'Error in creating importer';
  
    if (result.affectedRows) {
        message = 'Importer created successfully';
    }
  
    return {message};
}

async function update(id, importer) {
    const result = await db.query(
        `UPDATE importers 
        SET name="${importer.name}", address="${importer.address}",
        contact="${importer.contact}", logo_url="${importer.logo_url}"
        WHERE id=${id}`
    );

    let message = 'Error in updating importer';

    if (result.affectedRows) {
        message = 'Importer updated successfully';
    }

    return {message};
}

async function verify(id) {
    const result = await db.query(
        `UPDATE importers 
        SET verified_at=CURRENT_TIMESTAMP()
        WHERE id=${id}`
    );

    let message = 'Error in verifying importer';

    if (result.affectedRows) {
        message = 'Importer verifying successfully';
    }

    return {message};
}

async function remove(id) {
    const result = await db.query(
      `DELETE FROM importers WHERE id=${id}`
    );
  
    let message = 'Error in deleting importer';
  
    if (result.affectedRows) {
        message = 'Importer deleted successfully';
    }
  
    return {message};
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    verify,
    remove
}