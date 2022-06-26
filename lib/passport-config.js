const { Strategy, ExtractJwt }  = require('passport-jwt')
const passport = require('passport');

const config = require('./config')
const User = require('../models/User')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret
}

passport.serializeUser(function(user, done){
    done(null, user._id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err || !user) return done(err, null);
        done(null, user);
        });
    });

module.exports = (passport) => {
    passport.use(new Strategy(opts, function (payload, done) {
        User.findOne({id: payload.id}, function(err, user) {

        if (err) {
            return done(err, false);
        }

        if (user) {
            done(null, user)
        }
        else {
            done(null, false)
        }
    });
    }));
};
