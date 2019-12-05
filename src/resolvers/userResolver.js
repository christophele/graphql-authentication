// import {UserModel} from '../models/User';
import uuid from 'uuid/v4';
import {ObjectId} from 'mongodb';

module.exports = [{
    Query: {
        currentUser: (parent, args, context) => {
            return context.user;
            // return await context.UserModel.findById(ObjectId('5de967f22f5253983f610ff4'));
        },
    },
    Mutation: {
        login: async(parent, {email, password}, context) => {
            const {user} = await context.authenticate('graphql-local', {email, password});
            context.login(user);

            return {
                user
            }
        },
        signup: async(parent, {email, password}, context) => {
            const existingUsers = await context.UserModel.find();
            const isEmailExists = !!existingUsers.find(user => user.email === email);
            if (isEmailExists) {
                throw new Error('User with email already exists');
            }

            const newUser = new context.UserModel({email, password});
            await newUser.save();
            context.login(newUser);
    
            return {
                user: newUser
            }
        },
        logout: (parent, args, context) => context.logout(),
    },
}];