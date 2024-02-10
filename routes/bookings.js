const express = require('express');
const router = express.Router();
const bookingsService = require('../services/bookings');

/* GET all bookings */
router.get('/', async function(req, res, next) {
    try {
        res.json(await bookingsService.getAll(req.query.page));
    } catch (err) {
        console.error(`Error while getting bookings`, err.message);
        next(err);
    }
});

/* POST booking */
router.post('/', async function(req, res, next) {
    try {
        res.json(await bookingsService.create(req.body));
    } catch (err) {
        console.error(`Error while creating booking`, err.message);
        next(err);
    }
});

/* GET booking */
router.get('/:id', async function(req, res, next) {
    try {
        res.json(await bookingsService.getOne(req.params.id));
    } catch (err) {
        console.error(`Error while getting booking`, err.message);
        next(err);
    }
});

/* PUT booking */
router.put('/:id', async function(req, res, next) {
    try {
        res.json(await bookingsService.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating booking`, err.message);
        next(err);
    }
});

/* DELETE booking */
router.delete('/:id', async function(req, res, next) {
    try {
        res.json(await bookingsService.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting booking`, err.message);
        next(err);
    }
});

module.exports = router;