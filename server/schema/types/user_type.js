const mongoose = require('mongoose');
const graphql = require('graphql');

const ParkingType = require('./parking_type');
const BookingType = require('./booking_type');
const User = mongoose.model('user');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        name: { type: GraphQLString },
        parkings: {
            type: new GraphQLList(ParkingType),
            resolve(parentValue) {
                return User.findById(parentValue.id).populate('parkings')
                    .then(user => {
                        return user.parkings
                    });
            }
        },
        bookings: {
            type: new GraphQLList(BookingType),
            resolve(parentValue) {
                return User.findById(parentValue.id).populate('bookings')
                    .then(user => {
                        return user.bookings
                    });
            }
        }
    }
});

module.exports = UserType;