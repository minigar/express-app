const express = require('express');

const posts = require('./posts');
const users = require('./users');
const books = require('./books');
const refreshTokens = require('./refresh-tokens');
const postsComments = require('./posts-comments');
const booksComments = require('./books-comments');
const booksCommentsLikes = require('./books-comments-likes');
const bookLikes = require('./books-likes');
const postsLikes = require('./posts-likes');
const postsCommentsLikes = require('./posts-comments-likes');
const usersKarma = require('./users-karma');

const router = express.Router();

router.use(books, posts, users, refreshTokens, postsComments, booksComments, bookLikes, booksCommentsLikes, postsLikes, postsCommentsLikes, usersKarma);

module.exports = router