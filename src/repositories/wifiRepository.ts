import prisma from '../config/database.js';
import { wifi } from '@prisma/client';

export type CreateWifiData = Omit<wifi, 'id'>;