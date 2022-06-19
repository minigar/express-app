const express = require('express');

const posts = require('./posts');
const users = require('./users');
const books = require('./books');
const refreshTokens = require('./refresh-tokens');


const router = express.Router();

router.use(books, posts, users, refreshTokens);

module.exports = router