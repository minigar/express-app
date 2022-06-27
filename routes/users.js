const express = require('express');
const passport = require('passport');
require('../lib/passport-config')(passport);
const { getUserById, getUsers, aboutUser, updateAboutMe, changePassword, changeName } = require('../controllers/users');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:_id', getUserById);
router.get('/users/:_id/about', aboutUser);
router.put('/users/:_id/about', passport.authenticate('jwt', { session: false}), updateAboutMe);
router.put('/users/password/change', passport.authenticate('jwt', { session: false}), changePassword);
router.put('/users/:_id/name/change', passport.authenticate('jwt', { session: false}), changeName)

module.exports = router