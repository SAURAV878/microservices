import User from "../models/user.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js';
import bcrypt from 'bcrypt';


export const signUp = catchAsync( async (req, res, next) => {
    const { firstName, lastName, email, password , role} = req.body;
    
        const existingUser  = await  User.findOne({ where: {email}});
        if ( existingUser ) {
            return next(new AppError('Email already exists', 400))
        }


    const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
        role  
    });

    res.status(201).json ({
        status: 'succes',
        message: 'User created',
    });
});



export const login = catchAsync (async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email }});
    
    if(!user || !(await bcrypt.compare(password, user.password))) {
        return next ( new AppError('Incorrect email and password', 401));
    }

    const token = jwt.sign( { id: user.id}, process.env.JWT_SECRET_KEY, {
        expiresIn: '30d'
    });

    res.status(200).json({
        status: 'sucess',
        token,
        data: {
            user:{
                id: user.id,
                email: user.email,
                role: user.role
            }
        }
    })

})