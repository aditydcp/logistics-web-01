const express = require('express');
const router = express.Router();
const airlines = require('../services/airlines');

/* GET all airlines */
router.get('/', async function(req, res, next) {
    try {
        res.json(await airlines.getAll(req.query.page));
    } catch (err) {
        console.error(`Error while getting airlines`, err.message);
        next(err);
    }
});

/* POST airline */
router.post('/', async function(req, res, next) {
    try {
        res.json(await airlines.create(req.body));
    } catch (err) {
        console.error(`Error while creating airline`, err.message);
        next(err);
    }
});

/* GET airline */
router.get('/:id', async function(req, res, next) {
    try {
        res.json(await airlines.getOne(req.params.id));
    } catch (err) {
        console.error(`Error while getting airline`, err.message);
        next(err);
    }
});

/* PUT airline */
router.put('/:id', async function(req, res, next) {
    try {
        res.json(await airlines.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating airline`, err.message);
        next(err);
    }
});

/* DELETE airline */
router.delete('/:id', async function(req, res, next) {
    try {
        res.json(await airlines.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting airline`, err.message);
        next(err);
    }
});

module.exports = router;