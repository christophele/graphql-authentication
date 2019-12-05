const userResolver = require('./userResolver');

const rootResolver = {
    Query: {},
    Mutation: {},
};

module.exports = [
    rootResolver,
    ...userResolver
];