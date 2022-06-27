const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
require('../lib/passport-config')(passport);

const jwtMethods = require('../helpers/generate-jwt-tokens');

// give 2 new tokens and replace them with old
const updateTokens = (userId) => {
    const accessToken = jwtMethods.generateAccessToken(userId);
    const refreshToken = jwtMethods.generateRefreshToken();

    return jwtMethods.replaceRefreshTokenInDb(refreshToken.id, userId)
        .then(() => ({
            accessToken,
            refreshToken: refreshToken.token,
        }));
};


const getNewUser = async(req, res) => {
    const { name, email, password, aboutMe } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        res.status(400).json('This email aready exist')
    }

    if (password.length < 7) {
        res.status(400).json('Password must have 8 or more characters')
    }

    else{
        const salt = await bcrypt.genSalt(10);  
        const hash = await bcrypt.hash(password, salt); 
        await new User({ email, name, password: hash, aboutMe }).save(); // create new user
        // res.redirect('/api/auth/login');
        res.status(200).json(await User.find({ email }))
    }
}


const logIn = async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(401).json("Email not found")
    }

    else{
        const comparePassword = await bcrypt.compare(password, user.password);

        if (comparePassword) {
            updateTokens(user._id)
            .then(tokens => res.json(tokens))
        }

        else{
            res.status(401).json("Password incorrected")
        }
    }
}

module.exports = {
    getNewUser,
    logIn,
    updateTokens
}