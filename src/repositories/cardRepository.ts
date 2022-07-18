import prisma from '../config/database.js';
import { cards } from '@prisma/client';

export type CreateCardData = Omit<cards, 'id'>;