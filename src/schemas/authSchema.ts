import Joi from 'joi';
import { CreateUserData } from '../repositories/authRepository.js';

export const signUpSchema = Joi.object<CreateUserData>({

    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()

});

export const loginSchema = Joi.object<CreateUserData>({

    email: Joi.string().required(),
    password: Joi.string().required()

});