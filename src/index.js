import {ApolloServer} from 'apollo-server-express';
import session from 'express-session';
import express from 'express';
import uuid from 'uuid/v4';
import passport from 'passport';
import mongoose from 'mongoose';
import {GraphQLLocalStrategy, buildContext} from 'graphql-passport';
require('dotenv').config()
const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT; 
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import {SECRET} from './utils/secret';
import {UserModel} from './models/User';

const startServer = async () => {
    passport.use(
        new GraphQLLocalStrategy(async (email, password, done) => {
            const users = await UserModel.find();
            const matchingUser = users.find(user => email === user.email && password === user.password);
            const error = matchingUser ? null : new Error('no matching user');
            done(error, matchingUser);
        }),
    );

    const app = express();
    app.use(passport.initialize());
    app.use(passport.session()); // connect passport and express-session

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        const users = UserModel.find();
        const matchingUser = users.find(user => user._id === id);
        done(null, matchingUser);
    });

    // init Apollo server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req, res}) => buildContext({req, res, UserModel}),
    });
    
    server.applyMiddleware({app});

    await mongoose.connect(mongoUri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    
    mongoose.set('useCreateIndex', true);

    app.use(session({
        genid: (req) => uuid(), // gen session ID
        secret: SECRET,
        resave: false,
        saveUninitialized: false
    }));

    app.listen(port, () => {
        console.log(`🚀  Server ready at http://localhost:${port}${server.graphqlPath}`);
    });
};

startServer();




