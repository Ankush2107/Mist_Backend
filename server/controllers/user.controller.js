// import bcrypt from 'bcryptjs';
// import emailValidator from 'email-validator';
import asyncHandler from 'express-async-handler';

const registerUser = async (req, res, next) => {
    res.json({mesg: "Fill the register form"})
}

export {
    registerUser
};