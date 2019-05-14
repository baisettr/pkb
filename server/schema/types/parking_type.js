const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } = graphql;
const SlotType = require('./slot_type');
const Parking = mongoose.model('parking');

const ParkingType = new GraphQLObjectType({
    name: 'ParkingType',
    fields: () => ({
        id: { type: GraphQLID },
        street: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zip: { type: GraphQLInt },
        slots: { type: new GraphQLList(SlotType) },
        userId: {
            type: require("./user_type"),
            resolve(parentValue) {
                //console.log(parentValue);
                return Parking.findById(parentValue).populate('userId')
                    .then(parking => {
                        return parking.userId
                    });
            }
        }
    })
});

module.exports = ParkingType;
