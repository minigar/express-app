const User = require('../models/User');
const Book = require('../models/Book');


const addLike = async(req, res) => {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    const currentUserId = req.user._id;

    if (!book) {
        res.status(404).json("Book not found!")
    }

    if (book.likes.find((l) => l.user._id.toString() === currentUserId.toString())) {
        res.status(400).json("You alredy liked this post!");
    }

    else{
        book.likes.unshift({ user: currentUserId });
        res.status(200).json(await book.save());
    }
}

const deleteLike = async(req, res) => {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    const likeId = req.params.likeId;

    if (!book) {
        res.status(404).json("Book not found!");
    }

    const likeIndex = await book.likes.findIndex((l) => l._id.toString() === likeId.toString());

    if (likeIndex < 0)  {
        res.status(404).json("Like not found!");
    }

    book.likes.splice(likeIndex, 1);
    res.status(200).json(await book.save());
}

module.exports = {
    addLike,
    deleteLike
}