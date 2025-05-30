import { Document, Types, Schema, model } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    rol: string;
    id: Types.ObjectId;
    phone: string;
    createDate: Date;
    deleteDate: Date;
    status: boolean;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, required: true },  
    phone: { type: String, required: false },
    createDate: { type: Date, default: Date.now },
    deleteDate: { type: Date, default: null },
    status: { type: Boolean, default: true }
}, {
    timestamps: true
})

export const User = model<IUser>('User', userSchema, 'user');