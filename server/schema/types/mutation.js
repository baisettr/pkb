const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat, GraphQLList, GraphQLInputObjectType } = graphql;
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

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                name: { type: GraphQLString }
            },
            resolve(parentValue, { email, password, name }, req) {
                return AuthService.signup({ email, password, name, req });
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
                const booking = await (new Booking({ bookingDate, parkingId, userId })).save()
                const userUpdateBooking = await User.updateOne(
                    { _id: userId },
                    { $push: { bookings: booking._id } }
                );
                return booking
            }
        },
        addParking: {
            type: ParkingType,
            args: {
                street: { type: GraphQLString },
                city: { type: GraphQLString },
                state: { type: GraphQLString },
                slots: {
                    type: new GraphQLList(SlotInput)
                }
            },
            async resolve(parentValue, { street, city, state, slots }, req) {
                const userId = req.user._id;
                const parking = await (new Parking({ street, city, state, slots, userId })).save()
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