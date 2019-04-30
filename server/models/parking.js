const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParkingSchema = new Schema({
    street: { type: String },
    city: { type: String },
    State: { type: String },
    zip: { type: Number },
    slots: [
        { type: Date }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

ParkingSchema.statics.addSlots = function (id, slot) {
    return this.findById(id)
        .then(parking => {
            parking.slots.push(slot)
            return parking.save();
        })
};

/* 
{
    date: { type: Date },
    timings: [
        {
            time: { type: String },
            status: { type: String }
        }
    ]
} */

mongoose.model('parking', ParkingSchema);