const User = require("../models/User");
const bcrypt = require('bcryptjs');

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
    
    if (!compareUserId){
        res.status(400).json("You can't change about other users")
    }
    
    const filter = { _id: userId };
    const update = { aboutMe: aboutMe };
    const updatedAboutUser = await User.findOneAndUpdate(filter, update, { new: true });

    res.status(200).json(updatedAboutUser);
}

const aboutUser = async(req, res) => {
    const userId = req.params._id;
    const user = await User.findById(userId);
    if (!user) {
        res.status(404).json("User not found!");
    }

    const aboutUser = user.aboutMe;

    res.status(200).json(aboutUser);
}

const changePassword = async(req, res) => {
    const { email, password, newPassword } = req.body;
    const currentUserId = req.user._id;
    const user = await User.findById( currentUserId );
    
    if ( email !== user.email ) {
        res.status(400).json("Incorrect email");
    }

    if (password.length < 7) {
        res.status(400).json('Password must have 8 or more characters');
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (comparePassword) {
        const salt = await bcrypt.genSalt(10);  
        const hash = await bcrypt.hash(newPassword, salt);

        const filter = { _id: currentUserId };
        const update = { password: hash };
        const updatedUser = await User.findOneAndUpdate(filter, update, { new: true });

        res.status(200).json(updatedUser);
    }

    else{
        res.status(400).json("Passwords not same!");
    }
}

const changeName = async(req, res) => {
    const { email, password, newName } = req.body;
    const currentUserId = req.user._id;
    const currentUser = await User.findById(currentUserId);

    if ( email !== currentUser.email ) {
        res.status(400).json("Incorrect email");
    }

    if (password.length < 7) {
        res.status(400).json('Password must have 8 or more characters');
    }

    const comparePassword = await bcrypt.compare(password, currentUser.password);

    if (comparePassword) {
        const filter = { _id: currentUserId };
        const update = { name: newName };
        const updatedUser = await User.findOneAndUpdate(filter, update, { new: true });

        res.status(200).json(updatedUser);
    }

    else{
        res.status(400).json("Password incorrect!")
    }
}

module.exports = {
    getUserById,
    getUsers,
    aboutUser,
    updateAboutMe,
    changePassword,
    changeName
}