const express = require('express');
const passport = require('passport');
require('../lib/passport-config')(passport)


const { getAllPosts, deletePost, createNewPost, updatePost, getOnePostById } = require('../controllers/posts')

const router = express.Router();


router.get('/posts', getAllPosts)

router.get('/posts/:_id', getOnePostById)

router.post('/posts', passport.authenticate('jwt', { session: false}), createNewPost)

router.put('/posts/:postId', passport.authenticate('jwt', { session: false}), updatePost)

router.delete('/posts/:postId', passport.authenticate('jwt', { session: false}), deletePost)



module.exports = router