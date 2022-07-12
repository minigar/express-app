const Post = require('../models/Post');

const addLikeToBookComment = async(req, res) => {
    const { postId, commentId } = req.params;
    const post  = await Post.findById(postId);
    const currentUserId = req.user._id;

    if (!post) {
        res.status(404).json("Post not found!");
    }
    const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId) // find comment index

    if (commentIndex < 0) {
        res.status(404).json("Comment not found!")
    }

    const commentLikeIndex = post.comments[commentIndex].likes.find(l => l.user._id.toString() === currentUserId.toString()) // find like index

    if (commentLikeIndex) {
        res.status(400).json("You alredy liked this comment!");
    }

    else{
        post.comments[commentIndex].likes.unshift({ user: currentUserId }); // cuz in model we have user like Schema.Types.ObjectId
        res.status(200).json(await post.save());
    }
}

const deleteLikeFromBookComment = async(req, res) => {
    const { postId, commentId, likeId} = req.params;
    const post = await Post.findById(postId);
    const currentUserId = req.user._id;
    const compareUserId = post.user._id.toString() == currentUserId.toString()

    if (!post) {
        res.status(404).json("Post not found!");
    }

    if (!compareUserId) {
        res.status(400).json("It is not your post you can't delete it!'")
    }

    const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId)

    if (commentIndex < 0) {
        res.status(404).json("Comment not found")
    }

    const commentLikeIndex = await post.comments[commentIndex].likes.findIndex(l => l._id.toString() === likeId.toString());

    if (commentLikeIndex < 0)  {
        res.status(404).json("Like not found!");
    }

    post.comments[commentIndex].likes.splice(commentLikeIndex, 1);
    res.status(200).json(await post.save());
}



module.exports = {
    addLikeToBookComment,
    deleteLikeFromBookComment
}