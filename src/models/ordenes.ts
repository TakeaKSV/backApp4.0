import { Document, Types, Schema, model } from 'mongoose';

export interface IOrder extends Document {
    _id: Types.ObjectId;
    createDate: Date;
    user: Types.ObjectId;
    subtotal: number;
    total: number;
    status: boolean;
}

const orderSchema = new Schema<IOrder>({
    createDate: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    status: { type: Boolean, default: true }
}, {
    timestamps: true
});

export const Order = model<IOrder>('Order', orderSchema, 'order');
