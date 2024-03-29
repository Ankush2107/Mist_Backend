import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto";
const userSchema = new Schema({

    fullName: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [3, 'Name must be atleast 3 character'],
        maxLength: [50, 'Name should be less than 50 characters'],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: [8, 'Password must be atleast 8 characters'],
        select: false
    },

    // optional Information
    phoneNumber: {
        type: String
    },

    address: {
        type: String
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String,
        unique: true
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
    generateJWTtoken: async function () {
        const payload = {
            id: this._id,
            email: this.email,
            role: this.role
        }
        const secretKey = process.env.JWT_SECRET;
        const options = { expiresIn: process.env.JWT_EXPIRY }

        return await JWT.sign(payload, secretKey, options);
    },

    comparePassword: async function (plainTextPassword) {
        return await bcrypt.compare(plainTextPassword, this.password);
    },

    generatePasswordResetToken: async function () {
        const resetToken = crypto.randomBytes(20).toString("hex");

        this.forgotPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; //15 min from now

        return resetToken;
    }
}

const User = model('User', userSchema);
export default User;
