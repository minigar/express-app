const Post = require('../models/Post');

const getOnePostById = async(req, res) => {
    const postId = req.params._id;
    const post = await Post.findById(postId);

    if (!post) {
        res.status(404).json("Post not found!");
    }

    else{
        res.status(200).json(post);
    }
}

const getAllPosts = async(req, res) => {
    const books = await Post.find();

    res.status(200).json(books)
}

const createNewPost = async(req, res) => {
    const { body } = req.body;
    const currentUser = req.user;
    console.log(req.user)

    
    res.status(200).json(await new Post({ body, user: currentUser }).save());
}   

const updatePost = async(req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    const currentUserId = req.user._id;
    const compareUserId = post.user._id.toString() === currentUserId.toString();

    if (!post) {
        res.status(404).json("Post not found!");
    }

    if (compareUserId) {
        const { body } = req.body;
        const filter = { _id: postId };
        const update = { body };

        const updatedPost = await Post.findOneAndUpdate(filter, update, { new: true });
        res.status(200).json(updatedPost)
    }

    else{
        res.status(400).json("It is not your post you can't change it!")
    }
}

const deletePost = async(req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    const currentUserId = req.user._id;
    const compareUserId = post.user._id.toString() == currentUserId.toString()

    if (!post) {
        res.status(404).json("Post not found!");
    }

    else{
        if (compareUserId) {
            const conditions = { _id: postId }
            await Post.findOneAndDelete(conditions)
            res.status(200).json("You post has been deleted!")
        }

        else{
            res.status(400).json("It is not your post you can't delete it!")
        }
    }
}

module.exports = {
    getOnePostById,
    getAllPosts,
    createNewPost,
    updatePost,
    deletePost
}