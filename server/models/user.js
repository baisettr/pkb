const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String },
    password: { type: String },
    name: { type: String },
    parkings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'parking'
        }
    ],
    bookings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'booking'
        }
    ]
});

UserSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        })
    })
});


UserSchema.methods.comparePassword = function comparePassword(cpassword, cb) {
    bcrypt.compare(cpassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};

mongoose.model('user', UserSchema);


