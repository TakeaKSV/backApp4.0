import { Document, Types, Schema, model } from 'mongoose';

export interface IMenu extends Document {
    title: String,
    path: String,
    icon: String,
    roles: [],
}

const menuSchema = new Schema<IMenu>({
    title: { type: String, required: true },
    path: { type: String, required: true },
    icon: { type: String, required: true },
    roles: { type: [String], required: true },
});

export const Menu = model<IMenu>('Menu', menuSchema);