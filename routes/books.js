const express = require('express');
const Book = require('../models/Book');
const passport = require('passport');
require('../lib/passport-config')(passport);

const { getAllBooks, createNewBook, updateBook, deleteBook, getOneBookById } = require('../controllers/books')

const router = express.Router();

// router.get('/bookss', passport.authenticate('jwt', { session: false}), async(req, res) => {
//     const books = await Book.find();
//     res.render('books.ejs', { title: 'books', books: books})
// })

router.get('/books', getAllBooks)
router.get('/books/:_id', getOneBookById)
router.post('/books', passport.authenticate('jwt', { session: false}), createNewBook)
router.put('/books/:_id', passport.authenticate('jwt', { session: false}), updateBook)
router.delete('/books/:_id', passport.authenticate('jwt', { session: false}), deleteBook)


module.exports = router