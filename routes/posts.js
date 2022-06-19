const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
require('../lib/passport-config')(passport)

const urlencoded = bodyParser.urlencoded({ extended: false })

const { getPosts, deletePost, createPost, updatePost, getPost } = require('../controllers/posts')

const router = express.Router();


router.get('/posts', getPosts)

router.get('/posts/:_id', getPost)

router.post('/posts', passport.authenticate('jwt', { session: false}), createPost)

router.put('/posts/:_id', passport.authenticate('jwt', { session: false}), updatePost)

router.delete('/posts/:_id', passport.authenticate('jwt', { session: false}), deletePost)



module.exports = router