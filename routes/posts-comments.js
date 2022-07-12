const express = require('express');
const passport = require('passport');
require('../lib/passport-config')(passport)

const { getCommentsfromOnePost, createComment, deleteComment, updateComment } = require('../controllers/posts-comments');

const router = express.Router();

router.get('/posts/:postId/comments', getCommentsfromOnePost);
router.post('/posts/:postId/comments', passport.authenticate('jwt', { session: false}), createComment);
router.put('/posts/:postId/comments/:commentId', passport.authenticate('jwt', { session: false}), updateComment)
router.delete('/posts/:postId/comments/:commentId', passport.authenticate('jwt', { session: false}), deleteComment);


module.exports = router