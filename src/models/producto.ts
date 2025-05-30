import { Document, Types, Schema, model } from 'mongoose';

export interface IProduct extends Document {
    _id: Types.ObjectId;
    name: string;
    description: string;
    amount: number;
    price: number;
    createDate: Date;
    status: boolean;
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: false },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    createDate: { type: Date, default: Date.now },
    status: { type: Boolean, default: true }
}, {
    timestamps: true
});

export const Product = model<IProduct>('Product', productSchema, 'product');
