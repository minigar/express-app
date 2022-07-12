const Post = require('../models/Post');


const addLike = async(req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    const currentUserId = req.user._id;

    if (!post) {
        res.status(404).json("Post not found!")
    }

    if (post.likes.find((l) => l.user._id.toString() === currentUserId.toString())) {
        res.status(400).json("You alredy liked this post!");
    }

    else{
        post.likes.unshift({ user: currentUserId });
        res.status(200).json(await post.save());
    }
}

const deleteLike = async(req, res) => {
    const { postId, likeId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
        res.status(404).json("Post not found!");
    }

    const likeIndex = await post.likes.findIndex((l) => l._id.toString() === likeId.toString());

    if (likeIndex < 0)  {
        res.status(404).json("Like not found!");
    }

    post.likes.splice(likeIndex, 1);
    res.status(200).json(await post.save());
}

module.exports = {
    addLike,
    deleteLike
}