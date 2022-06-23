const Book = require('../models/Book');
const User = require('../models/User');

const getOneBookById = async(req, res) => {
    const bookId = req.params._id;
    const book = await Book.findById(bookId);

    if (!book) {
        res.status(404).json("Book not found!");
    }

    else{
        res.status(200).json(book);
    }
}

const getAllBooks = async(req, res) => {
    const books = await Book.find();

    res.status(200).json(books)
}

const createNewBook = async(req, res) => {
    const { name, description, cost } = req.body;
    const user = req.user;
    const book = await Book.findOne({ name })

    if (name.length <= 7) {
        res.json("Book's name must have 7 or more symbwols!");
        res.status(400)
    }

    else{
        if(book) {
            res.json("This book's name alredy exist!");
            res.status(400);
        }

        else{
            res.json(await new Book({ name, description, user, cost }).save())
            res.status(200);
        }
    }
}   

const updateBook = async(req, res) => {
    const bookId = req.params._id;
    const book = await Book.findById(bookId);
    const userId = req.user._id
    const compareUserId = book.user._id.toString() == userId.toString()

    if (!book) {
        res.status(404).json("Book not found!");
    }

    else{
        if (compareUserId) {
            const { name, description, cost } = req.body;
            const filter = { _id: bookId };
            const update = { name: name, description: description, cost: cost };

            const updatedBook = await Book.findOneAndUpdate(filter, update, { new: true });
            res.status(200).json(updatedBook)
        }

        else{
            res.status(400).json("It is not your book you can't change it!")
        }
    }
}

const deleteBook = async(req, res) => {
    const bookId = req.params._id;
    const book = await Book.findById(bookId);
    const userId = req.user._id;
    const compareUserId = book.user._id.toString() == userId.toString()

    if (!book) {
        res.status(404).json("Book not found!");
    }

    else{
        if (compareUserId) {
            const conditions = { _id: bookId }
            await Book.findOneAndDelete(conditions)
            res.status(200).json("You book has been deleted!")
        }

        else{
            res.status(400).json("It is not your book you can't delete it!")
        }
    }
}

module.exports = {
    getOneBookById,
    getAllBooks,
    createNewBook,
    updateBook,
    deleteBook
}