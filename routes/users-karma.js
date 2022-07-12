const express = require('express');
const passport = require('passport');
require('../lib/passport-config')(passport);

const { addKarma, deleteKarma } = require('../controllers/users-karma');

const router = express.Router();

router.post('/users/:userId/karma', passport.authenticate('jwt', { session: false}), addKarma);
router.delete('/users/:userId/karma/:karmaId', passport.authenticate('jwt', { session: false}), deleteKarma);

module.exports = router