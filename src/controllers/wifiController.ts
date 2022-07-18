import { Request, Response } from 'express';
import { CreateWifiData } from '../repositories/wifiRepository.js';
import { UserToken } from '../repositories/credentialRepository.js';
import * as wifiService from '../services/wifiService.js';

export async function createWifi (req: Request, res: Response) {
    
    const wifiData: CreateWifiData = req.body;
    const user: UserToken = res.locals.user;

    await wifiService.createWifi(user, wifiData);

    res.sendStatus(201);

}

export async function deleteWifi (req: Request, res: Response) {
    
    const wifiId = +req.params.id;
    const user: UserToken = res.locals.user;

    await wifiService.deleteWifiData(user, wifiId);

    res.sendStatus(201);

}

export async function getWifi (req: Request, res: Response) {
    
    const wifiId = +req.query.id;
    const user: UserToken = res.locals.user;

    if (!wifiId) {
        const wifis = await wifiService.getWifi_All(user);
        return res.status(201).send(wifis);
    }

    const wifi = await wifiService.getWifi_One(user, wifiId);

    res.status(201).send(wifi);

}