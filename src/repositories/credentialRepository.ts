import prisma from '../config/database.js';
import { credentials } from '@prisma/client';

export type CreateCredentialData = Omit<credentials, 'id'>;

export interface UserToken {

    id: number,
    email: string

}

export async function insertCredentialData (credentialData: CreateCredentialData) {
    
    await prisma.credentials.create({ data: credentialData });

}

export async function deleteCredentialData (user: UserToken, credentialId) {
    
    await prisma.credentials.deleteMany({ where: { userId: user.id, id: parseInt(credentialId) } });

    return;

}

export async function checkForTitle (userId: number, credentialTitle: string) {
    
    const credential = await prisma.credentials.findFirst({where: { userId, title: credentialTitle }});

    return credential;

}

export async function getCredentials_One (user: UserToken, credentialId) {
    
    const credential = await prisma.credentials.findFirst({ where: { userId: user.id, id: parseInt(credentialId) } });

    return credential;

}

export async function getCredentials_All (user: UserToken) {
    
    const credential = await prisma.credentials.findMany({ where: { userId: user.id } });

    return credential;

}