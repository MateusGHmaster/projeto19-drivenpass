import Cryptr from 'cryptr';
import { CreateCardData } from '../repositories/cardRepository.js';
import { UserToken } from '../repositories/credentialRepository.js';
import * as cardRepository from '../repositories/cardRepository.js';

export async function createCardData (user: UserToken, cardData: CreateCardData) {
    
    const card = await cardRepository.checkForCardTitle(user, cardData.title);

    if (card) {
        throw {
            type: 'conflict',
            message: 'Card: title already in use'
        }
    }

    const cryptr = new Cryptr(process.env.JWT_SECRET);

    const encryptedSecurityCode = cryptr.encrypt(cardData.securityCode);
    cardData.securityCode = encryptedSecurityCode;
    const encryptedPassword = cryptr.encrypt(cardData.password);
    cardData.password = encryptedPassword;

    await cardRepository.insertCardData(user, cardData);

}

export async function deleteCardData (user: UserToken, cardId: number) {
    
    const card = await cardRepository.getCardData_One(user, cardId);

    if (!card) {
        throw {
            type: 'not_found',
            message: 'Card: not found'
        }
    }

    await cardRepository.deleteCardData(user, cardId);

    return;

}

export async function getCardData_One (user: UserToken, cardId: number) {
    
    const card = await cardRepository.getCardData_One(user, cardId);

    if (!card) {
        throw {
            type: 'not_found',
            message: 'Card: not found'
        }
    }

    const cryptr = new Cryptr(process.env.JWT_SECRET);

    const decryptedSecurityCode = cryptr.decrypt(card.securityCode);
    card.securityCode = decryptedSecurityCode;
    const decryptedPassword = cryptr.encrypt(card.password);
    card.password = decryptedPassword;

    return card;

}

export async function getCardData_All (user: UserToken) {
    
    const cards = await cardRepository.getCardData_All(user);

    cards.forEach((card) => {
        const cryptr = new Cryptr(process.env.JWT_SECRET);
        const decryptedSecurityCode = cryptr.decrypt(card.securityCode);
        card.securityCode = decryptedSecurityCode;
        const decryptedPassword = cryptr.encrypt(card.password);
        card.password = decryptedPassword;
    });

    return cards;

}
