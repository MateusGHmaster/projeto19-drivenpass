import { Request, Response } from 'express';
import { CreateCredentialData } from '../repositories/credentialRepository.js';
import * as credentialService from '../services/credentialService.js';

export async function createCredentials (req: Request, res: Response) {
    
    const credentialData: CreateCredentialData = req.body;

    await credentialService.createCredential(credentialData);

    res.sendStatus(201);

}

export async function deleteCredentials (req: Request, res: Response) {
    
    const credentialId = req.params.id;
    const { user } = res.locals;

    await credentialService.deleteCredentialData(user, credentialId);

    res.sendStatus(201);

}

export async function getCredentials (req: Request, res: Response) {
    
    const credentialId = req.query.id;
    const { user } = res.locals;

    if (!credentialId) {
        const credentials = await credentialService.getAllCredentialsData(user);
        return res.status(201).send(credentials);
    }

    const credential = await credentialService.getCredentialsData(user, credentialId);

    res.status(201).send(credential);

}
