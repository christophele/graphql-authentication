const {gql} = require('apollo-server-express');

module.exports = [gql`
    extend type User {
        _id: ID
        firstname: String
        lastname: String
        password: String
        email: String
    }

    extend type AuthPayload {
        user: User
    }

    extend type Query {
        currentUser: User
    }

    extend type Mutation {
        login(email: String!, password: String!): AuthPayload
        signup(email: String!, password: String!): AuthPayload
        logout: Boolean
    }
`];