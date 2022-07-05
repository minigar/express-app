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
    const { body } = req.body;
    const { bookId, commentId} = req.params;
    const book = await Book.findById(bookId);
    const currentUserId = req.user._id;
    const compareUserId = book.user._id.toString() == currentUserId.toString();

    if (!book) {
        res.status(404).json("Book not found!");
    }

    if (!compareUserId) {
        res.status(400).json("It is not your book you can't change it!'")
    }

    const commentIndex = book.comments.findIndex(comment => comment._id.toString() === commentId);

    if (commentIndex < 0) {
        res.status(404).json("Comment not found!");
    }

    book.comments[commentIndex].body = body;
    res.status(200).json(await book.save());
}

const deleteComment = async(req, res) => {
    const { bookId, commentId} = req.params;
    const book = await Book.findById(bookId);
    const currentUserId = req.user._id;
    const compareUserId = book.user._id.toString() == currentUserId.toString();

    if (!book) {
        res.status(404).json("Book not found!");
    }

    if (!compareUserId) {
        res.status(400).json("It is not your book you can't delete it!'");
    }

    const commentIndex = book.comments.findIndex(comment => comment._id.toString() === commentId);

    if (commentIndex < 0) {
        res.status(404).json("Comment not found");
    }

    book.comments.splice(commentIndex, 1);
    res.status(200).json(await book.save());
}

module.exports = {
    getCommentsfromOnePost,
    createComment,
    updateComment,
    deleteComment
}