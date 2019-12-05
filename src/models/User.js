import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
        uppercase: true
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
});

export const UserModel = mongoose.model('user', UserSchema); 