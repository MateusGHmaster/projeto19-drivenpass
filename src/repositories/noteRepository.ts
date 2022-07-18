import prisma from '../config/database.js';
import { notes } from '@prisma/client';

export type CreateNoteData = Omit<notes, 'id'>;