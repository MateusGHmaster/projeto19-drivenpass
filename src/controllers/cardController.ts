import { Request, Response } from 'express';
import { CreateCardData } from '../repositories/cardRepository.js';
import { UserToken } from '../repositories/credentialRepository.js';
import * as cardService from '../services/cardService.js'

export async function createCard (req: Request, res: Response) {
    
    const cardData: CreateCardData = req.body;
    const user: UserToken = res.locals.user;

    await cardService.createCardData(user, cardData);

    res.sendStatus(201);

}

export async function deleteCard (req: Request, res: Response) {

    const cardId = +req.params.id;
    const user: UserToken = res.locals.user;

    await cardService.deleteCardData(user, cardId);

    res.sendStatus(201);

}

export async function getCard (req: Request, res: Response) {
    
    const cardId = +req.query.id;
    const user: UserToken = res.locals.user; 

    if (!cardId) {
        const cards = await cardService.getCardData_All(user);
        return res.status(201).send(cards);
    }

    const card = cardService.getCardData_One(user, cardId);

    res.status(201).send(card);

}