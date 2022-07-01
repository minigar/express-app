const express = require('express');
const passport = require('passport');
require('../lib/passport-config')(passport)

const { getCommentsfromOnePost, createComment, deleteComment, updateComment } = require('../controllers/books-comments');

const router = express.Router();

router.get('/books/:bookId/comments', getCommentsfromOnePost);
router.post('/books/:bookId/comments', passport.authenticate('jwt', { session: false}), createComment);
router.put('/books/:bookId/comments', passport.authenticate('jwt', { session: false}), updateComment)
router.delete('/books/:bookId/comments', passport.authenticate('jwt', { session: false}), deleteComment);


module.exports = router