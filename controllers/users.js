const User = require("../models/User");

const getUserById = async(req, res) => {
    const userId = req.params._id;
    const user = await User.findById(userId);

    if (!user) {
        res.status(404).json("User not found");
    }

    else{
        res.status(200).json(user)
    }
}

const getUsers = async(req, res) => {
    const users = await User.find();

    res.status(200).json(users);
}

const updateAboutMe = async(req, res) => {
    const userId = req.params._id;
    const user = await User.findById(userId);
    const currentUserId = req.user._id;
    const { aboutMe } = req.body;

    if (!user) {
        res.status(401).json("User not found!");
        }

    
    const compareUserId = userId.toString() === currentUserId.toString()
    console.log(userId.toString(), "  ", currentUserId.toString())
    
    if (!compareUserId){
        res.status(400).json("You can't change about other users")
    }
    
    const filter = { _id: userId };
    const update = { aboutMe: aboutMe };
    const updatedAboutUser = await User.findOneAndUpdate(filter, update, { new: true });

    res.status(200).json(updatedAboutUser);
}

const aboutUser = async(req, res) => {

}

const changePassword = async(req, res) => {

}

const changeName = async(req, res) => {

}

module.exports = {
    getUserById,
    getUsers,
    aboutUser,
    updateAboutMe,
    changePassword,
    changeName
}