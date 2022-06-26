const express = require('express');

const router = express.Router();

const { getNewUser, logIn } = require('../controllers/auth')


// router.get('/register', async(req, res) => {
//     res.render('register.ejs', { title: 'Register' })
// });

router.post('/register', getNewUser);

// router.get('/login', async(req, res) => {
//     res.render('login.ejs', { title: 'Log In' })
// })

router.post('/login', logIn);

module.exports = router