const express = require('express');
const router = express.Router();
const airlinesService = require('../services/airlines');
const flightsService = require('../routes/flights')

/* GET all airlines */
router.get('/', async function(req, res, next) {
    try {
        res.json(await airlinesService.getAll(req.query.page));
    } catch (err) {
        console.error(`Error while getting airlines`, err.message);
        next(err);
    }
});

/* POST airline */
router.post('/', async function(req, res, next) {
    try {
        res.json(await airlinesService.create(req.body));
    } catch (err) {
        console.error(`Error while creating airline`, err.message);
        next(err);
    }
});

/* GET airline */
router.get('/:id', async function(req, res, next) {
    try {
        res.json(await airlinesService.getOne(req.params.id));
    } catch (err) {
        console.error(`Error while getting airline`, err.message);
        next(err);
    }
});

/* PUT airline */
router.put('/:id', async function(req, res, next) {
    try {
        res.json(await airlinesService.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating airline`, err.message);
        next(err);
    }
});

/* DELETE airline */
router.delete('/:id', async function(req, res, next) {
    try {
        res.json(await airlinesService.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting airline`, err.message);
        next(err);
    }
});

/* GET all flights via airline */
router.get('/:id/flights', async function(req, res, next) {
    try {
        res.json(await flightsService.getAllByAirline(req.params.id, req.query.page))
    } catch (err) {
        console.error(`Error while getting flights via airline`, err.message);
        next(err);
    }
})

module.exports = router;