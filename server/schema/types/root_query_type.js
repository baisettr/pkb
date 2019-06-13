const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLFloat } = graphql;

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
                console.log(parkings[0]['slots'][0]);
                return parkings;
            }
        },
        geoLocationParkings: {
            type: new GraphQLList(ParkingType),
            args: {
                lng: { type: new GraphQLNonNull(GraphQLFloat) },
                lat: { type: new GraphQLNonNull(GraphQLFloat) },
            },
            async resolve(rootValue, { lng, lat }) {
                let METERS_PER_MILE = 1609.34
                return Parking.find({ location: { $nearSphere: { $geometry: { type: "Point", coordinates: [lng, lat] }, $maxDistance: 5 * METERS_PER_MILE } }, slots: { $elemMatch: { status: true } } })
            }
        },
        allParkings: {
            type: new GraphQLList(ParkingType),
            resolve(rootValue, args, context) {
                let METERS_PER_MILE = 1609.34
                return Parking.find({ location: { $nearSphere: { $geometry: { type: "Point", coordinates: [-123.2657711, 44.5727998] }, $maxDistance: 5 * METERS_PER_MILE } }, slots: { $elemMatch: { status: true } } })
            }
        }
    })
});

module.exports = RootQueryType;