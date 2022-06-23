const express = require('express');
const passport = require('passport');
require('../lib/passport-config')(passport)

const { getAllBooks, createNewBook, updateBook, deleteBook } = require('../controllers/books')

const router = express.Router();


router.get('/books', getAllBooks)
router.post('/books', passport.authenticate('jwt', { session: false}), createNewBook)
router.put('/books', passport.authenticate('jwt', { session: false}), updateBook)
router.delete('/books', passport.authenticate('jwt', { session: false}), deleteBook)


module.exports = router