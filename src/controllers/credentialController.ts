import { Request, Response } from 'express';
import { CreateCredentialData, UserToken } from '../repositories/credentialRepository.js';
import * as credentialService from '../services/credentialService.js';

export async function createCredential (req: Request, res: Response) {

    const credentialData: CreateCredentialData = req.body;
    const user: UserToken= res.locals.user;

    await credentialService.createCredentialData(user, credentialData);

    res.sendStatus(201);

}

export async function deleteCredentials (req: Request, res: Response) {
    
    const credentialId = +req.params.id;
    const user: UserToken = res.locals.user;

    await credentialService.deleteCredentialData(user, credentialId);

    res.sendStatus(201);

}

export async function getCredentials (req: Request, res: Response) {
    
    const credentialId = +req.query.id;
    const user: UserToken = res.locals.user;

    if (!credentialId) {
        const credentials = await credentialService.getAllCredentialsData(user);
        return res.status(201).send(credentials);
    }

    const credential = await credentialService.getCredentialsData(user, credentialId);

    res.status(201).send(credential);

}
