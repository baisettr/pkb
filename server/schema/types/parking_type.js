const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLList, GraphQLInt } = graphql;
const SlotType = require('./slot_type');
const Parking = mongoose.model('parking');

const LocationType = new GraphQLObjectType({
    name: 'LocationType',
    fields: () => ({
        type: { type: GraphQLString },
        coordinates: { type: new GraphQLList(GraphQLFloat) }
    })
});

const ParkingType = new GraphQLObjectType({
    name: 'ParkingType',
    fields: () => ({
        id: { type: GraphQLID },
        slotNo: { type: GraphQLString },
        street: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zip: { type: GraphQLInt },
        location: { type: LocationType },
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
