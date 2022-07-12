const User = require('../models/User');


const addKarma = async(req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const currentUserId = req.user._id;

    if (!user) {
        res.status(404).json("User not found!")
    }

    if (user.karma.find((k) => k.user._id.toString() === currentUserId.toString())) {
        res.status(400).json("You alredy add karma to this user!");
    }

    else{
        user.karma.unshift({ user: currentUserId });
        res.status(200).json(await user.save());
    }
}

const deleteKarma = async(req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const likeId = req.params.likeId;

    if (!user) {
        res.status(404).json("User not found!");
    }

    const likeIndex = await user.karma.findIndex((k) => k._id.toString() === likeId.toString());

    if (likeIndex < 0)  {
        res.status(404).json("Karma not found!");
    }

    user.karma.splice(likeIndex, 1);
    res.status(200).json(await user.save());
}

module.exports = {
    addKarma,
    deleteKarma
}