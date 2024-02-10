const db = require('./db');
const helper = require('../helpers/db-helper');
const config = require('../configurations/db-config');

async function getAll(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM bookings LIMIT ${offset},${config.listPerPage}`
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
        `SELECT * FROM bookings WHERE id=${id}`
    );
    const data = helper.emptyOrRows(result);

    return {data};
}

async function create(booking) {
    const result = await db.query(
        `INSERT INTO bookings 
         (user_id, exporter_id, importer_id, flight_id,
          type, quantity, packaging, dimension, weight) VALUES
         (${booking.user_id},
          ${booking.exporter_id},
          ${booking.importer_id},
          ${booking.flight_id},
          '${booking.type}',
          ${booking.quantity},
          '${booking.packaging}',
          ${booking.dimension},
          ${booking.weight})`
    );
  
    let message = 'Error in creating booking';
  
    if (result.affectedRows) {
        message = 'Booking created successfully';
    }
  
    return {message};
}

async function update(id, booking) {
    const result = await db.query(
        `UPDATE bookings SET
            user_id=${booking.user_id},
            exporter_id=${booking.exporter_id},
            importer_id=${booking.importer_id},
            flight_id=${booking.flight_id},
            type="${booking.type}",
            quantity=${booking.quantity},
            packaging="${booking.packaging}",
            dimension=${booking.dimension},
            weight=${booking.weight}
        WHERE id=${id}`
    );

    let message = 'Error in updating booking';

    if (result.affectedRows) {
        message = 'Booking updated successfully';
    }

    return {message};
}

async function updateStatus(id, status) {
    const result = await db.query(
        `UPDATE bookings SET status=${status} WHERE id=${id}`
    );

    let message = 'Error in updating booking status';

    if (result.affectedRows) {
        message = 'Booking status updated successfully';
    }

    return {message};
}

async function remove(id) {
    const result = await db.query(
      `DELETE FROM bookings WHERE id=${id}`
    );
  
    let message = 'Error in deleting booking';
  
    if (result.affectedRows) {
        message = 'Booking deleted successfully';
    }
  
    return {message};
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    updateStatus,
    remove
}