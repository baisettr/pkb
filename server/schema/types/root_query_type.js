const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString, GraphQLNonNull } = graphql;

const Booking = mongoose.model('booking');
const Parking = mongoose.model('parking');

const UserType = require('./user_type');
const BookingType = require('./booking_type');
const ParkingType = require('./parking_type');

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        user: {
            type: UserType,
            resolve(parentValue, args, req) {
                return req.user
            }
        },
        userParkings: {
            type: new GraphQLList(ParkingType),
            resolve(rootValue, args, req) {
                const userId = req.user._id;
                return Parking.find({ userId });
            }
        },
        userBookings: {
            type: new GraphQLList(BookingType),
            resolve(rootValue, args, req) {
                const userId = req.user._id;
                return Booking.find({ userId });
            }
        },
        booking: {
            type: BookingType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return Booking.findById(id);
            }
        },
        parking: {
            type: ParkingType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parnetValue, { id }) {
                return Parking.findById(id);
            }
        },
        locationParkings: {
            type: new GraphQLList(ParkingType),
            args: {
                city: { type: new GraphQLNonNull(GraphQLString) },
                state: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(rootValue, { city, state }) {
                const parkings = await Parking.find({ city, state, slots: { $elemMatch: { status: true } } });
                return parkings;
            }
        },
        allParkings: {
            type: new GraphQLList(ParkingType),
            resolve(rootValue, args, context) {
                return Parking.find();
            }
        }
    })
});

module.exports = RootQueryType;