const express = require('express');

const posts = require('./posts');
const users = require('./users');
const books = require('./books');
const refreshTokens = require('./refresh-tokens');
const postsComments = require('./post-comments');
const booksComments = require('./books-comments');
const booksCommentsLikes = require('./books-comments-likes');
const bookLikes = require('./books-likes');

const router = express.Router();

router.use(books, posts, users, refreshTokens, postsComments, booksComments, bookLikes, booksCommentsLikes);

module.exports = router