const graphql = require('graphql');
const { GraphQLScalarType } = graphql;


const DateType = new GraphQLScalarType({
    name: 'date',
    serialize: value => {
        return new Date(value).toJSON().slice(0, 10)
    },
    parseValue: value => {

        return new Date(value);
    },
    parseLiteral: ast => {
        //let x = ast.fields;
        //console.log(ast)
        /* x.map((y) => {
            let m = y.name.value;
            let n = "";
            if (m === "parkDate") {
                n = y.value.value;
            } else if (m === "timings") {
                n = y.value.values;
                n.map((e) => {
                    e.fields.map((f) => {
                        console.log(f.name.value,
                            f.value.value)
                    })
                })
            }
            console.log(m, n)

        }) */
        return new Date(ast.value);
    }
});

const TimeType = new GraphQLScalarType({
    name: 'time',
    serialize: value => {
        return new Date(value);
    },
    parseValue: value => {
        return new Date(value);
    },
    parseLiteral: ast => {

        return new Date(ast.value);
    }
});

const SlotType = new GraphQLScalarType({
    name: 'time',
    serialize: value => {
        return new Date(value);
    },
    parseValue: value => {
        return new Date(value);
    },
    parseLiteral: ast => {

        return new Date(ast.value);
    }
});

module.exports = { DateType, TimeType };