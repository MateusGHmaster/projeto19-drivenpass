import Joi from 'joi';
import { CreateCardData } from '../repositories/cardRepository';

export const cardSchema = Joi.object<CreateCardData>({

    title: Joi.string().required(),
    number: Joi.string().length(16).required(),
    name: Joi.string().required(),
    securityCode: Joi.string().pattern(/^[0-9]{3}/).required(),
    expirationDate: Joi.string().pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})/).required(),
    password: Joi.string().required(),
    isVirtual: Joi.boolean().required(),
    type: Joi.string().valid('credit', 'debit', 'both').required()

});