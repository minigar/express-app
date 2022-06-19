const express = require('express');

const router = express.Router();

const { getNewUser, logIn } = require('../controllers/auth')


router.post('/register', getNewUser);

router.post('/login', logIn);

module.exports = router