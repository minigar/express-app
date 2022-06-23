const Book = require('../models/Book');
const User = require('../models/User');

const getAllBooks = async(req, res) => {
    const books = Book.find();

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

}

const deleteBook = async(req, res) => {

}

module.exports = {
    getAllBooks,
    createNewBook,
    updateBook,
    deleteBook
}