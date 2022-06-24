const express = require('express');
const passport = require('passport');
require('../lib/passport-config')(passport)

const { getCommentsfromOnePost, createComment, deleteComment, updateComment } = require('../controllers/books-comments');

const router = express.Router();

router.get('/books/:bookId/comments', getCommentsfromOnePost);
router.post('/books/:bookId/comments', passport.authenticate('jwt', { session: false}), createComment);
router.post('/books/:bookId/comments', passport.authenticate('jwt', { session: false}), deleteComment);
router.post('/books/:bookId/comments', passport.authenticate('jwt', { session: false}), updateComment)


module.exports = router