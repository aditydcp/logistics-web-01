const express = require('express');
const router = express.Router();
const airportsService = require('../services/airports');
const flightsService = require('../routes/flights')

/* GET all airports */
router.get('/', async function(req, res, next) {
    try {
        res.json(await airportsService.getAll(req.query.page));
    } catch (err) {
        console.error(`Error while getting airports`, err.message);
        next(err);
    }
});

/* POST airport */
router.post('/', async function(req, res, next) {
    try {
        res.json(await airportsService.create(req.body));
    } catch (err) {
        console.error(`Error while creating airport`, err.message);
        next(err);
    }
});

/* GET airport */
router.get('/:id', async function(req, res, next) {
    try {
        res.json(await airportsService.getOne(req.params.id));
    } catch (err) {
        console.error(`Error while getting airport`, err.message);
        next(err);
    }
});

/* PUT airport */
router.put('/:id', async function(req, res, next) {
    try {
        res.json(await airportsService.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating airport`, err.message);
        next(err);
    }
});

/* DELETE airport */
router.delete('/:id', async function(req, res, next) {
    try {
        res.json(await airportsService.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting airport`, err.message);
        next(err);
    }
});

/* GET all flights via airport */
router.get('/:id/flights', async function(req, res, next) {
    try {
        res.json(await flightsService.getAllByAirport(req.params.id, req.query.page))
    } catch (err) {
        console.error(`Error while getting flights via airport`, err.message);
        next(err);
    }
})

module.exports = router;