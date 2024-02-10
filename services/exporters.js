const db = require('./db');
const helper = require('../helpers/db-helper');
const config = require('../configurations/db-config');

async function getAll(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM exporters LIMIT ${offset},${config.listPerPage}`
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
        `SELECT * FROM exporters WHERE id=${id}`
    );
    const data = helper.emptyOrRows(result);

    return {data};
}

async function create(exporter) {
    let address = helper.valueOrNull(exporter.address)
    let contact = helper.valueOrNull(exporter.contact)
    let logo_url = helper.valueOrNull(exporter.logo_url)
    const result = await db.query(
        `INSERT INTO exporters 
         (name, address, contact, logo_url) VALUES
         ('${exporter.name}', ${address}, ${contact}, ${logo_url})`
    );
  
    let message = 'Error in creating exporter';
  
    if (result.affectedRows) {
        message = 'Exporter created successfully';
    }
  
    return {message};
}

async function update(id, exporter) {
    const result = await db.query(
        `UPDATE exporters 
        SET name="${exporter.name}", address="${exporter.address}",
        contact="${exporter.contact}", logo_url="${exporter.logo_url}"
        WHERE id=${id}`
    );

    let message = 'Error in updating exporter';

    if (result.affectedRows) {
        message = 'Exporter updated successfully';
    }

    return {message};
}

async function verify(id) {
    const result = await db.query(
        `UPDATE exporters 
        SET verified_at=CURRENT_TIMESTAMP()
        WHERE id=${id}`
    );

    let message = 'Error in verifying exporter';

    if (result.affectedRows) {
        message = 'Exporter verifying successfully';
    }

    return {message};
}

async function remove(id) {
    const result = await db.query(
      `DELETE FROM exporters WHERE id=${id}`
    );
  
    let message = 'Error in deleting exporter';
  
    if (result.affectedRows) {
        message = 'Exporter deleted successfully';
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