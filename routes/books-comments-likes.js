const express = require('express');
const passport = require('passport');
require('../lib/passport-config')(passport)

const Book = require('../models/Book')

const { addLikeToBookComment, deleteLikeFromBookComment } = require('../controllers/books-comments-likes')

const router = express.Router();

router.post('/books/:bookId/comments/:commentId/likes', passport.authenticate('jwt', { session: false}), addLikeToBookComment);
router.delete('/books/:bookId/comments/:commentId/likes/:likeId', passport.authenticate('jwt', { session: false}), deleteLikeFromBookComment);

module.exports = router