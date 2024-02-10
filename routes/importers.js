const express = require('express');
const router = express.Router();
const importersService = require('../services/importers');

/* GET all importers */
router.get('/', async function(req, res, next) {
    try {
        res.json(await importersService.getAll(req.query.page));
    } catch (err) {
        console.error(`Error while getting importers`, err.message);
        next(err);
    }
});

/* POST importer */
router.post('/', async function(req, res, next) {
    try {
        res.json(await importersService.create(req.body));
    } catch (err) {
        console.error(`Error while creating importer`, err.message);
        next(err);
    }
});

/* GET importer */
router.get('/:id', async function(req, res, next) {
    try {
        res.json(await importersService.getOne(req.params.id));
    } catch (err) {
        console.error(`Error while getting importer`, err.message);
        next(err);
    }
});

/* PUT importer */
router.put('/:id', async function(req, res, next) {
    try {
        res.json(await importersService.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating importer`, err.message);
        next(err);
    }
});

/* DELETE importer */
router.delete('/:id', async function(req, res, next) {
    try {
        res.json(await importersService.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting importer`, err.message);
        next(err);
    }
});

module.exports = router;