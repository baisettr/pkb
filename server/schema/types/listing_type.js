const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } = graphql;
const SlotType = require('./slot_type');
const { DateType, TimeType } = require('./date_type');
const ParkingType = require('./parking_type');

const ListingType = new GraphQLObjectType({
    name: 'ListingType',
    fields: () => ({
        id: { type: GraphQLID },
        date: { type: DateType },
        parkingId: { type: ParkingType },
        price: { type: GraphQLInt },
        slots: { type: new GraphQLList(TimeType) }
    })
});

module.exports = ListingType;
