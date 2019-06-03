const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParkingSchema = new Schema({
    slotNo: { type: String },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: Number },
    slots: [
        {
            slotDate: { type: Date },
            price: { type: Number },
            status: Boolean
        }
    ],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

ParkingSchema.statics.addSlots = function (id, slots) {
    return this.findById(id)
        .then(parking => {
            parking.slots = [...parking.slots, slots]
            return parking.save();
        })
};

ParkingSchema.statics.modifySlotStatus = function (id, slotUpdate) {
    return this.findById(id)
        .then(parking => {
            const updatedSlots = parking.slots.map((slot) => {
                if (slot.slotDate === slotUpdate.slotDate) {
                    slot.status = slotUpdate.status;
                }
                return slot
            })
            parking.slots = updatedSlots;
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