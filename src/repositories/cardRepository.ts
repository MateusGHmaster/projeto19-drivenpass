import prisma from '../config/database.js';
import { cards } from '@prisma/client';
import { UserToken } from './credentialRepository.js';

export type CreateCardData = Omit<cards, 'id' | 'userId'>;

export async function checkForCardTitle (user: UserToken, cardTitle: string) {

    const card = await prisma.cards.findFirst({ where: { userId: user.id, title: cardTitle } });

    return card;

}

export async function insertCardData (user: UserToken, cardData: CreateCardData) {
    
    const card = await prisma.cards.create({ data: { ...cardData, userId: user.id } });

}

export async function deleteCardData (user: UserToken, cardId: number) {
    
    await prisma.cards.deleteMany({ where: { userId: user.id, id: cardId } });

    return;

}

export async function getCardData_One (user: UserToken, cardId: number) {
    
    const card = await prisma.cards.findFirst({ where: { userId: user.id, id: cardId } });

    return card;

}

export async function getCardData_All (user: UserToken) {
    
    const card = await prisma.cards.findMany({ where: { userId: user.id } });

    return card;

}
