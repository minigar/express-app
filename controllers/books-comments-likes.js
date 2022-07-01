const User = require('../models/User');
const Book = require('../models/Book');

const addLikeToBookComment = async(req, res) => {
    const { bookId, commentId } = req.params;
    const book  = await Book.findById(bookId);
    const currentUserId = req.user._id;

    if (!book) {
        res.status(404).json("Book not found!");
    }
    const commentIndex = book.comments.findIndex(comment => comment._id.toString() === commentId) // find comment index

    if (commentIndex < 0) {
        res.status(404).json("Comment not found!")
    }

    const commentLikeIndex = book.comments[commentIndex].likes.find(l => l.user._id.toString() === currentUserId.toString()) // find like index

    if (commentLikeIndex) {
        res.status(400).json("You alredy liked this comment!");
    }

    else{
        book.comments[commentIndex].likes.unshift({ user: currentUserId }); // cuz in model we have user like Schema.Types.ObjectId
        res.status(200).json(await book.save());
    }
}

const deleteLikeFromBookComment = async(req, res) => {
    const { bookId, commentId, likeId} = req.params;
    const book = await Book.findById(bookId);
    const currentUserId = req.user._id;
    const compareUserId = book.user._id.toString() == currentUserId.toString()

    if (!book) {
        res.status(404).json("Book not found!");
    }

    if (!compareUserId) {
        res.status(400).json("It is not your book you can't delete it!'")
    }

    const commentIndex = book.comments.findIndex(comment => comment._id.toString() === commentId)

    if (commentIndex < 0) {
        res.status(404).json("Comment not found")
    }

    const commentLikeIndex = await book.comments[commentIndex].likes.findIndex(l => l._id.toString() === likeId.toString());

    if (commentLikeIndex < 0)  {
        res.status(404).json("Like not found!");
    }

    book.comments[commentIndex].likes.splice(commentLikeIndex, 1);
    res.status(200).json(await book.save());
}



module.exports = {
    addLikeToBookComment,
    deleteLikeFromBookComment
}