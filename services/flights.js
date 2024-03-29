const db = require('./db');
const helper = require('../helpers/db-helper');
const config = require('../configurations/db-config');

async function getAll(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM flights LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function getAllByAirport(airportId, page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM flights
         WHERE departure_airport_id = ${airportId}
         OR arrival_airport_id = ${airportId}
         LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function getAllByAirline(airlineId, page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM flights
         WHERE airline_id = ${airlineId}
         LIMIT ${offset},${config.listPerPage}`
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
        `SELECT * FROM flights WHERE id=${id}`
    );
    const data = helper.emptyOrRows(result);

    return {data};
}

async function create(flight) {
    const result = await db.query(
        `INSERT INTO flights 
        (airline_id, plane_model, baggage_size, departure_airport_id, departure_datetime, arrival_airport_id, arrival_datetime) 
        VALUES 
        (${flight.airline_id}, '${flight.plane_model}', ${flight.baggage_size},
         ${flight.departure_airport_id}, '${flight.departure_datetime}',
         ${flight.arrival_airport_id}, '${flight.arrival_datetime}')`
    );
  
    let message = 'Error in creating flight';
  
    if (result.affectedRows) {
        message = 'Flight created successfully';
    }
  
    return {message};
}

async function update(id, flight) {
    const result = await db.query(
        `UPDATE flights 
        SET airline_id="${flight.airline_id}", plane_model=${flight.plane_model}, baggage_size=${flight.baggage_size}, 
        departure_airport_id=${flight.departure_airport_id}, departure_datetime=${flight.departure_datetime}, 
        arrival_airport_id=${flight.arrival_airport_id}, arrival_datetime=${flight.arrival_datetime}
        WHERE id=${id}`
    );

    let message = 'Error in updating flight';

    if (result.affectedRows) {
        message = 'Flight updated successfully';
    }

    return {message};
}

async function remove(id) {
    const result = await db.query(
      `DELETE FROM flights WHERE id=${id}`
    );
  
    let message = 'Error in deleting flight';
  
    if (result.affectedRows) {
        message = 'Flight deleted successfully';
    }
  
    return {message};
}

module.exports = {
    getAll,
    getAllByAirport,
    getAllByAirline,
    getOne,
    create,
    update,
    remove
}