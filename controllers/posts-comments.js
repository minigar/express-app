const Post = require('../models/Post')

const getCommentsfromOnePost = async(req, res) => {
    const { postId } = req.params;
    const post = await Post.findOne({ _id: postId });
    if (!post) {
        res.status(404).json("Post not found")
    }

    const comments = post.comments;

    res.status(200).json(comments);
}

const createComment = async(req, res) => {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
        res.status(404).json("Post not found!");
    }

    const { body } = req.body;
    const user = req.user;

    await post.comments.unshift({ body, user });
    res.status(200).json(await post.save());
}

const updateComment = async(req, res) => {
    const { body } = req.body;
    const { postId, commentId} = req.params;
    const post = await Post.findById(postId);
    const currentUserId = req.user._id;
    const compareUserId = post.user._id.toString() == currentUserId.toString();

    if (!post) {
        res.status(404).json("Post not found!");
    }

    if (!compareUserId) {
        res.status(400).json("It is not your post you can't change it!'")
    }

    const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);

    if (commentIndex < 0) {
        res.status(404).json("Comment not found!");
    }

    post.comments[commentIndex].body = body;
    res.status(200).json(await post.save());
}

const deleteComment = async(req, res) => {
    const { postId, commentId} = req.params;
    const post = await Post.findById(postId);
    const currentUserId = req.user._id;
    const compareUserId = post.user._id.toString() == currentUserId.toString();

    if (!post) {
        res.status(404).json("Post not found!");
    }

    if (!compareUserId) {
        res.status(400).json("It is not your post you can't delete it!'");
    }

    const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);

    if (commentIndex < 0) {
        res.status(404).json("Comment not found");
    }

    post.comments.splice(commentIndex, 1);
    res.status(200).json(await post.save());
}

module.exports = {
    getCommentsfromOnePost,
    createComment,
    updateComment,
    deleteComment
}