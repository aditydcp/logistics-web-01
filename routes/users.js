const express = require('express');
const router = express.Router();
const usersService = require('../services/users');

/* GET all users */
router.get('/', async function(req, res, next) {
    try {
        res.json(await usersService.getAll(req.query.page));
    } catch (err) {
        console.error(`Error while getting users`, err.message);
        next(err);
    }
});

/* POST user */
router.post('/', async function(req, res, next) {
    try {
        res.json(await usersService.create(req.body));
    } catch (err) {
        console.error(`Error while creating user`, err.message);
        next(err);
    }
});

/* GET user by id */
router.get('/:id', async function(req, res, next) {
    try {
        res.json(await usersService.getOneById(req.params.id));
    } catch (err) {
        console.error(`Error while getting user`, err.message);
        next(err);
    }
});

/* PUT user */
router.put('/:id', async function(req, res, next) {
    try {
        res.json(await usersService.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating user`, err.message);
        next(err);
    }
});

/* DELETE user */
router.delete('/:id', async function(req, res, next) {
    try {
        res.json(await usersService.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting user`, err.message);
        next(err);
    }
});

module.exports = router;