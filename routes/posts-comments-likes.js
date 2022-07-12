const express = require('express');
const passport = require('passport');
require('../lib/passport-config')(passport)

const Book = require('../models/Book')

const { addLikeToBookComment, deleteLikeFromBookComment } = require('../controllers/posts-comments-likes')

const router = express.Router();

router.post('/posts/:postId/comments/:commentId/likes', passport.authenticate('jwt', { session: false}), addLikeToBookComment);
router.delete('/posts/:postId/comments/:commentId/likes/:likeId', passport.authenticate('jwt', { session: false}), deleteLikeFromBookComment);

module.exports = router