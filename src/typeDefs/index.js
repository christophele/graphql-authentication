const userTypeDef = require('./userTypeDef');
const {gql} = require('apollo-server-express');

const linkSchema = gql`
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

    type AuthPayload {
        _: Boolean
    }

    type User {
        _: Boolean
    }
`;

module.exports = [
    linkSchema,
    ...userTypeDef
];