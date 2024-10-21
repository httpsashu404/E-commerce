import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    phone: { type: Number, require: true },
    createdAt: { type: Date, default: Date.now }
})

export const Admin = mongoose.model('admin', adminSchema)