import prisma from '../config/database.js';
import { users } from '@prisma/client';

export type CreateUserData = Omit<users, 'id'>;

export async function insertUser (userData: CreateUserData) {
    
    await prisma.users.create({ data: userData });

}

export async function findByEmail (email: string) {
    
    const user = await prisma.users.findUnique({where: { email }});

    return user;

}