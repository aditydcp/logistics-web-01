const express = require('express');
const router = express.Router();
const authServices = require('../services/auth')

/* POST login user */
router.post('/login', async function(req, res, next) {
    try {
        res.json(await authServices.login(req.body));
    } catch (err) {
        console.error(`Error while authenticating`, err.message);
        next(err);
    }
});

module.exports = router;