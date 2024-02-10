const express = require('express');
const router = express.Router();
const airports = require('../services/airports');

/* GET all airports */
router.get('/', async function(req, res, next) {
    try {
        res.json(await airports.getAll(req.query.page));
    } catch (err) {
        console.error(`Error while getting airports`, err.message);
        next(err);
    }
});

/* POST airport */
router.post('/', async function(req, res, next) {
    try {
        res.json(await airports.create(req.body));
    } catch (err) {
        console.error(`Error while creating airport`, err.message);
        next(err);
    }
});

/* GET airport */
router.get('/:id', async function(req, res, next) {
    try {
        res.json(await airports.getOne(req.params.id));
    } catch (err) {
        console.error(`Error while getting airport`, err.message);
        next(err);
    }
});

/* PUT airport */
router.put('/:id', async function(req, res, next) {
    try {
        res.json(await airports.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating airport`, err.message);
        next(err);
    }
});

/* DELETE airport */
router.delete('/:id', async function(req, res, next) {
    try {
        res.json(await airports.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting airport`, err.message);
        next(err);
    }
});

module.exports = router;