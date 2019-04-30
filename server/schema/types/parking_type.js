const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } = graphql;
const SlotType = require('./slot_type');
const { DateType } = require('./date_type');
/* const Parking = mongoose.model('parking');

import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language'; */


const ParkingType = new GraphQLObjectType({
    name: 'ParkingType',
    fields: () => ({
        id: { type: GraphQLID },
        street: { type: GraphQLString },
        city: { type: GraphQLString },
        State: { type: GraphQLString },
        zip: { type: GraphQLInt },
        slots: { type: new GraphQLList(DateType) }
    })
});

module.exports = ParkingType;
