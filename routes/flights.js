const express = require('express');
const router = express.Router();
const flightsService = require('../services/flights');
const authMiddleware = require('../middlewares/auth')

/* GET all flights */
router.get('/', authMiddleware, async function(req, res, next) {
    try {
        res.json(await flightsService.getAll(req.query.page));
    } catch (err) {
        console.error(`Error while getting flights`, err.message);
        next(err);
    }
});

/* POST flight */
router.post('/', async function(req, res, next) {
    try {
        res.json(await flightsService.create(req.body));
    } catch (err) {
        console.error(`Error while creating flight`, err.message);
        next(err);
    }
});

/* GET flight */
router.get('/:id', async function(req, res, next) {
    try {
        res.json(await flightsService.getOne(req.params.id));
    } catch (err) {
        console.error(`Error while getting flight`, err.message);
        next(err);
    }
});

/* PUT flight */
router.put('/:id', async function(req, res, next) {
    try {
        res.json(await flightsService.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating flight`, err.message);
        next(err);
    }
});

/* DELETE flight */
router.delete('/:id', async function(req, res, next) {
    try {
        res.json(await flightsService.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting flight`, err.message);
        next(err);
    }
});

module.exports = router;