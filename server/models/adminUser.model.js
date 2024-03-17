import { Schema, model } from "mongoose";

const adminUserSchema = new Schema({

    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    permissions: {
        type: String
    },
    isApproved: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Admin = model('Admin', adminUserSchema);
export default Admin;