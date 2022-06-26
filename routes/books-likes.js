const express = require('express');
const passport = require('passport');
require('../lib/passport-config')(passport);

const { addLike, deleteLike } = require('../controllers/books-likes');

const router = express.Router();

router.post('/books/:bookId/likes', passport.authenticate('jwt', { session: false}), addLike);
router.delete('/books/:bookId/likes/:likeId', passport.authenticate('jwt', { session: false}), deleteLike);

module.exports = router