const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLID } = graphql;
const { DateType } = require('./date_type');

const Booking = mongoose.model('booking');

const BookingType = new GraphQLObjectType({
    name: 'BookingType',
    fields: () => ({
        id: { type: GraphQLID },
        bookingDate: { type: DateType },
        price: { type: GraphQLFloat },
        bookingStatus: { type: GraphQLString },
        parkingId: {
            type: require("./parking_type"),
            resolve(parentValue) {
                return Booking.findById(parentValue._id).populate('parkingId')
                    .then(booking => {
                        return booking.parkingId
                    });
            }
        },
        userId: {
            type: require("./user_type"),
            resolve(parentValue) {
                //console.log(parentValue);
                return Booking.findById(parentValue._id).populate('userId')
                    .then(booking => {
                        //console.log(booking);
                        return booking.userId
                    });
            }
        }
    })
});

module.exports = BookingType;
