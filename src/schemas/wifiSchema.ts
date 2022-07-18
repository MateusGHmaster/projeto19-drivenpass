import Joi from 'joi';
import { CreateWifiData } from '../repositories/wifiRepository.js';

export const wifiSchema = Joi.object<CreateWifiData>({

    title: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required()

});