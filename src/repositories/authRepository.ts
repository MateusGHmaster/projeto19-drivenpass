import { users } from '@prisma/client';
import prisma from '../config/database.js';

export type CreateUserData = Omit<users, 'id'>;

export async function insertUser (userData: CreateUserData) {
    
    await prisma.users.create({ data: userData });

}

export async function findByEmail (email: string) {
    
    const user = await prisma.users.findUnique({where: { email }});

    return user;

}