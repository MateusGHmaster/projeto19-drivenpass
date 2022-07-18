import Joi from 'joi';
import { CreateCredentialData } from '../repositories/credentialRepository.js';

export const credentialSchema = Joi.object<CreateCredentialData>({

    userId: Joi.number().integer().required(),
    title: Joi.string().min(3).required(),
    url: Joi.string().uri().required(),
    user: Joi.string().required(),
    password: Joi.string().required()

});