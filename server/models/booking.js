const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    id: { type: String },
    bookingDate: { type: Date },
    parkingId: {
        type: Schema.Types.ObjectId,
        ref: 'parking'
    },
    price: { type: Number },
    bookingStatus: { type: String },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

mongoose.model('booking', BookingSchema);