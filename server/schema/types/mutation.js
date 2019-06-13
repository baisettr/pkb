const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLFloat, GraphQLList, GraphQLInputObjectType } = graphql;
const mongoose = require('mongoose');

const Parking = mongoose.model('parking');
const Booking = mongoose.model('booking');
const User = mongoose.model('user');

const AuthService = require('../../services/auth');

const UserType = require('./user_type');
const ParkingType = require('./parking_type');
const BookingType = require('./booking_type');
const { DateType } = require('./date_type');

const SlotInput = new GraphQLInputObjectType({
    name: 'SlotInput',
    fields: () => ({
        slotDate: { type: DateType },
        price: { type: GraphQLFloat },
        status: { type: GraphQLBoolean },
    })
});

const LocationInput = new GraphQLInputObjectType({
    name: 'LocationInput',
    fields: () => ({
        type: { type: GraphQLString },
        coordinates: { type: new GraphQLList(GraphQLFloat) }
    })
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString }
            },
            resolve(parentValue, { email, password, firstName, lastName }, req) {
                return AuthService.signup({ email, password, firstName, lastName, req });
            }

        },
        logout: {
            type: UserType,
            resolve(parentValue, args, req) {
                const { user } = req;

                req.logout();
                return user;
            }

        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, req) {
                return AuthService.login({ email, password, req });
            }

        },
        addBooking: {
            type: BookingType,
            args: {
                bookingDate: { type: DateType },
                parkingId: { type: GraphQLString }
            },
            async resolve(parentValue, { bookingDate, parkingId }, req) {
                const userId = req.user._id;
                const bookingStatus = "Booked";
                const booking = await (new Booking({ bookingDate, parkingId, userId, bookingStatus })).save()
                const userUpdateBooking = await User.updateOne(
                    { _id: userId },
                    { $push: { bookings: booking._id } }
                );
                /* const updateParking = await Parking.findById(
                    parkingId, { slots: { $elemMatch: { status: true } } }
                ); */
                const updateParking = await Parking.updateOne(
                    { _id: parkingId, "slots.slotDate": bookingDate },
                    { $set: { "slots.$.status": false } }
                );
                return booking
            }
        },
        addParking: {
            type: ParkingType,
            args: {
                slotNo: { type: GraphQLString },
                street: { type: GraphQLString },
                city: { type: GraphQLString },
                state: { type: GraphQLString },
                zip: { type: GraphQLInt },
                slots: {
                    type: new GraphQLList(SlotInput)
                },
                location: { type: LocationInput }
            },
            async resolve(parentValue, { slotNo, street, city, state, location, zip, slots }, req) {
                const userId = req.user._id;
                const parking = await (new Parking({ slotNo, street, city, state, location, zip, slots, userId })).save()
                const userUpdateParking = await User.updateOne(
                    { _id: userId },
                    { $push: { parkings: parking._id } }
                );
                return parking
            }
        }
    }
});

module.exports = mutation;


/*

        addLyricToSong: {
            type: SongType,
            args: {
                content: { type: GraphQLString },
                songId: { type: GraphQLID }
            },
            resolve(parentValue, { content, songId }) {
                return Song.addLyric(songId, content);
            }
        },
*/