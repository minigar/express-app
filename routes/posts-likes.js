const express = require('express');
const passport = require('passport');
require('../lib/passport-config')(passport);

const { addLike, deleteLike } = require('../controllers/posts-likes');

const router = express.Router();

router.post('/posts/:postId/likes', passport.authenticate('jwt', { session: false}), addLike);
router.delete('/posts/:postId/likes/:likeId', passport.authenticate('jwt', { session: false}), deleteLike);

module.exports = router