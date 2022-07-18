import Cryptr from 'cryptr';
import { CreateCredentialData } from '../repositories/credentialRepository.js';
import * as credentialRepository from '../repositories/credentialRepository.js';
import { UserToken } from '../repositories/credentialRepository.js';

export async function createCredentialData (credentialData: CreateCredentialData) {

    const credentials = await credentialRepository.checkForTitle(credentialData.userId, credentialData.title);

    if (credentials) {
        throw {
            type: 'conflict',
            message: 'Credentials: already in use!'
        };
    }

    const cryptr = new Cryptr(process.env.JWT_SECRET);

    const encryptedPassword = cryptr.encrypt(credentialData.password);
    credentialData.password = encryptedPassword;

    await credentialRepository.insertCredentialData(credentialData);

}

export async function deleteCredentialData (user: UserToken, credentialId: number) {

    const credential = await credentialRepository.getCredentials_One(user, credentialId);

    if (!credential) {
        throw {
            type: 'not_found',
            message: 'Credentials: not found'
        }
    }

    await credentialRepository.deleteCredentialData(user, credentialId);

    return;

}

export async function getCredentialsData (user: UserToken, credentialId: number) {

    const credential = await credentialRepository.getCredentials_One(user, credentialId);

    if (!credential) {
        throw {
            type: 'not_found',
            message: 'Credentials: not found'
        }
    }

    const cryptr = new Cryptr(process.env.CRYPTR_KEY);

    const decryptedPassword = cryptr.decrypt(credential.password);
    credential.password = decryptedPassword;

    return credential;

}

export async function getAllCredentialsData (user: UserToken) {

    const credentials = await credentialRepository.getCredentials_All(user);

    credentials.forEach((credential) => {
        const cryptr = new Cryptr(process.env.CRYPTR_KEY);
        const decryptedPassword = cryptr.decrypt(credential.password);
        credential.password = decryptedPassword;
    });

    return credentials;

}
