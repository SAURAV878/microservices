import User from "../models/user.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const getUser = catchAsync(async (req, res, next) => {
    const user = await User.findByPk(req.user.id);

    if(!user) {
        return next (new AppError('User not found', 404 ));
    }

    res.status(200).json({
        status: 'sucess',
        data: { user }
    });
    
});

export const updateUser = catchAsync(async (req, res, next) =>{

    const user = await User.findByPk(req.params.id);

    if(!user) {
        return next (new AppError('user not found', 404));
    }

    const updateUser = await user.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    });

    res.status(200).json({
        status: 'sucess',
        message: 'User updated sucessfully',
        data: {
            user
        }
    });
    
});

export const deleteUser = catchAsync (async (req, res, next) => {

    const user = await User.findByPk(req.params.id);

    if(!user) {
        return next (new AppError('user not found', 404));
    }

    await user.destroy();

    res.status(200).json({
        status: 'sucess',
        message: 'user deleted sucessfully'
    });

})