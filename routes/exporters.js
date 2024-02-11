const express = require('express');
const router = express.Router();
const exportersService = require('../services/exporters');
const bookingsService = require('../services/bookings')

/* GET all exporters */
router.get('/', async function(req, res, next) {
    try {
        res.json(await exportersService.getAll(req.query.page));
    } catch (err) {
        console.error(`Error while getting exporters`, err.message);
        next(err);
    }
});

/* POST exporter */
router.post('/', async function(req, res, next) {
    try {
        res.json(await exportersService.create(req.body));
    } catch (err) {
        console.error(`Error while creating exporter`, err.message);
        next(err);
    }
});

/* GET exporter */
router.get('/:id', async function(req, res, next) {
    try {
        res.json(await exportersService.getOne(req.params.id));
    } catch (err) {
        console.error(`Error while getting exporter`, err.message);
        next(err);
    }
});

/* PUT exporter */
router.put('/:id', async function(req, res, next) {
    try {
        res.json(await exportersService.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating exporter`, err.message);
        next(err);
    }
});

/* DELETE exporter */
router.delete('/:id', async function(req, res, next) {
    try {
        res.json(await exportersService.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting exporter`, err.message);
        next(err);
    }
});

/* GET all bookings via exporter */
router.get('/:id/bookings', async function(req, res, next) {
    try {
        res.json(await bookingsService.getAllByExporter(req.params.id, req.query.page))
    } catch (err) {
        console.error(`Error while getting bookings via exporter`, err.message);
        next(err);
    }
})

module.exports = router;