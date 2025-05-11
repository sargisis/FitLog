import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true, 
    },
    passwordHash: {
        type: String , 
        required: true,
    },
},{timestamps: true,versionKey: false,})

export default mongoose.model('User' , UserSchema);