const express = require('express');
const jwt = require('jsonwebtoken'); //library for authentication
const config = require('../lib/config');
const Token = require('../models/Token');

const { updateTokens } = require('../controllers/auth');

const router = express.Router();


const passport = require('passport');
require('../lib/passport-config')(passport)


router.post('/refresh', passport.authenticate('jwt', { session: false}), async(req, res) => {
    const { refreshToken } = req.body;
    let payload;

    try{
        // verify token
        payload = jwt.verify(refreshToken, config.jwt.secret);

        if (payload.type !== 'refresh') {
            res.status(400).json('your token Invalid !')
            return;
        }
    }

    catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.json('Expired token')
            return;
        }

        else if (e instanceof jwt.JsonWebTokenError) {
            res.json('your token Invalid!')
            return;
        }
    }
    
    Token.findOne({ _id: payload.id })
        .exec()
        .then((token) => {
            if (token === null) {
                res.json('Invalid token!')
            }

            else{
            // create new access token and new refresh token
            return updateTokens(req.user._id)
            }
        })
        // write 2 new tokens in body 
        // #FIXME WHY RETURNS not found???
        .then(tokens => res.json(tokens))
        .catch(err => console.log(err))
})

module.exports = router