import { Document, Types, Schema, model } from 'mongoose';

export interface IRole extends Document {
    _id: Types.ObjectId;
    type: string;
    createDate: Date;
    status: boolean;
}

const roleSchema = new Schema<IRole>({
    type: { type: String, required: true },
    createDate: { type: Date, default: Date.now },
    status: { type: Boolean, default: true }
}, {
    timestamps: true
});

export const Role = model<IRole>('Role', roleSchema, 'role');