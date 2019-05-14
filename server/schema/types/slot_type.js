const graphql = require('graphql');
const { GraphQLObjectType, GraphQLBoolean, GraphQLFloat } = graphql;
const { DateType } = require('./date_type');

const SlotType = new GraphQLObjectType({
    name: 'SlotType',
    fields: () => ({
        slotDate: { type: DateType },
        price: { type: GraphQLFloat },
        status: { type: GraphQLBoolean },
    })
});

module.exports = SlotType;
