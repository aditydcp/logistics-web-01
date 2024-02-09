const express = require('express');
const router = express.Router();
const flights = require('../services/flights');

/* GET all flights */
router.get('/', async function(req, res, next) {
    try {
        res.json(await flights.getAll(req.query.page));
    } catch (err) {
        console.error(`Error while getting flights`, err.message);
        next(err);
    }
});

/* POST flight */
router.post('/', async function(req, res, next) {
    try {
        res.json(await flights.create(req.body));
    } catch (err) {
        console.error(`Error while creating flight`, err.message);
        next(err);
    }
});

/* GET flight */
router.get('/:id', async function(req, res, next) {
    try {
        res.json(await flights.getOne(req.params.id));
    } catch (err) {
        console.error(`Error while getting flight`, err.message);
        next(err);
    }
});

/* PUT flight */
router.put('/:id', async function(req, res, next) {
    try {
        res.json(await flights.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating flight`, err.message);
        next(err);
    }
});

/* DELETE flight */
router.delete('/:id', async function(req, res, next) {
    try {
        res.json(await flights.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting flight`, err.message);
        next(err);
    }
});

module.exports = router;