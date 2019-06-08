const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('user');

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        cb(err, user);
    });
});

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, cb) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) return cb(err);
        if (!user) return cb(null, false, 'Invalid Credentials');

        user.comparePassword(password, (err, isMatch) => {
            if (err) return cb(err);

            if (isMatch) return cb(null, user);

            return cb(null, false, 'Invalid Credentials');
        });
    });
}));

function signup({ email, password, firstName, lastName, req }) {
    const user = new User({ email, password, firstName, lastName });
    if (!email || !password) throw new Error('You must provide an email and password');

    return User.findOne({ email })
        .then(exUser => {
            if (exUser) throw new Error('Email is in Use');
            return user.save();
        })
        .then(user => {
            return new Promise((resolve, reject) => {
                req.login(user, (err) => {
                    if (err) reject(err);
                    resolve(user);
                })
            })
        })

};

function login({ email, password, req }) {
    return new Promise((resolve, reject) => {
        passport.authenticate('local', (err, user) => {
            if (!user) reject('Invalid Credentials');

            req.login(user, () => resolve(user));
        })({ body: { email, password } });
    });
};

module.exports = { signup, login };