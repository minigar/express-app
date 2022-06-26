const Book = require('../models/Book')

const getCommentsfromOnePost = async(req, res) => {
    const bookId = req.params.bookId;
    const book = await Book.findOne({ _id: bookId });
    if (!book) {
        res.status(404).json("Book not found")
    }
    
    const comments = book.comments;

    res.status(200).json(comments);
}

const createComment = async(req, res) => {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);

    if (!book) {
        res.status(404).json("Book not found!");
    }

    const { body } = req.body;
    const user = req.user;

    await book.comments.unshift({ body, user });
    res.status(200).json(await book.save());
}

const updateComment = async(req, res) => {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    const user = req.user;
    
}

const deleteComment = async(req, res) => {

}

module.exports = {
    getCommentsfromOnePost,
    createComment,
    updateComment,
    deleteComment
}