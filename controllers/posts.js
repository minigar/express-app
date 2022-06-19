const Post = require('../models/Post');
const User = require('../models/User');


const getPosts = async(req, res) => {
    const posts = await Post.find();

    res.status(200).json(posts)
}

const createPost = async(req, res) => {
    const { body } = req.body;

    const user = req.user

    console.log(user)

    if (body.length < 6) {
        res.status(400).json("Your post can't contain less then 7 symbols LOL");
    }

    else{
        await new Post({ body, user:user._id }).save();
        res.status(200).json(await Post.findOne({ body }));
    }
}

const updatePost = async(req, res) => {
    const { _id, body } = req.body;
    const user = req.user
}

const deletePost = async(req, res) => {
    const post_id = req.params._id;
    const currentUser = req.user;
    const post = await Post.findById(post_id)


    console.log(post)
    console.log(post.user._id.toString())
    console.log(currentUser._id.toString())
    if (post.user._id.toString() === currentUser._id.toString()) {
        await Post.findOneAndDelete({ _id: post_id, user: currentUser });
        res.status(200).json("Post has been deleted");
    }

    else{
        res.status(400).json("It not your post you can't delete it")
    }
    
}

const getPost = async(req, res) => {
    const postId = req.params._id;
    const post = await Post.findById(postId);

    if (!post) {
        res.status(404).json("Post not found")
    }
    else{
        res.status(200).json(post)
    }
}

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    getPost
}