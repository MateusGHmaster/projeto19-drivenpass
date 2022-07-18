import prisma from '../config/database.js';
import { wifi } from '@prisma/client';
import { UserToken } from './credentialRepository.js';

export type CreateWifiData = Omit<wifi, 'id' | 'userId'>;

export async function checkForWifiTitle (user: UserToken, wifiTitle: string) {
    
    const wifi = await prisma.wifi.findFirst({ where: { userId: user.id, title: wifiTitle } });

    return wifi;

}

export async function insertWifiData (user: UserToken, wifiData: CreateWifiData) {

    await prisma.wifi.create({ data: { ...wifiData, userId: user.id } });

}

export async function deleteWifiData (user: UserToken, wifiId: number) {
    
    const wifi = await prisma.wifi.deleteMany({ where: { userId: user.id, id: wifiId } });

    return;

}

export async function getWifiData_One (user: UserToken, wifiId: number) {
    
    const wifi = await prisma.wifi.findFirst({ where: { userId: user.id, id: wifiId } });

    return wifi;

}

export async function getWifiData_All (user: UserToken) {
    
    const wifi = await prisma.wifi.findMany({ where: { userId: user.id } });

    return wifi;

}
