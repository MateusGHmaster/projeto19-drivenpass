import Joi from 'joi';
import { CreateNoteData } from '../repositories/noteRepository.js';

export const noteSchema = Joi.object({

    title: Joi.string().max(50).required(),
    note: Joi.string().max(1000).required()

});