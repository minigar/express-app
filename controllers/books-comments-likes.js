const User = require('../models/User');
const Book = require('../models/Book');

const addLikeToBookComment = async(req, res) => {
    const { bookId, commentId } = req.params;
    const book  = await Book.findById(bookId);
    const currentUserId = req.user._id;
    const commentIndex = book.comments;

    if (!book) {
        res.status(404).json("Book not found!");
    }

    commentIndex.findIndex(async(comment) => {
        comment._id.toString() === commentId;
    
        if (comment.likes.find((l) => l.user._id.toString() === currentUserId.toString())) {
            res.status(400).json("You alredy liked this comment!");
        }

        else{
            comment.likes.unshift({ user: currentUserId });
            res.status(200).json(await book.save());
        }
    })
}

const deleteLikeFromBookComment = async(req, res) => {}


module.exports = {
    addLikeToBookComment,
    deleteLikeFromBookComment
}