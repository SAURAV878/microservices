import User from "../models/user.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from 'jsonwebtoken'

export const protect = catchAsync(async (req, res, next)=> {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return next (new AppError('You are not logged in !', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const currentUser = await User.findByPk(decoded.id);
    if(!currentUser) {
        return next (new AppError('Tooken no longer exists', 401));
    }

    req.user = currentUser;
    next();
})


export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next (new AppError('You do not have permission to perform this action', 403));
        }

        next();
    }
}