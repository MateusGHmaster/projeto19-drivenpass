import Cryptr from "cryptr";
import { CreateWifiData } from "../repositories/wifiRepository.js";
import { UserToken } from "../repositories/credentialRepository.js";
import * as wifiRepository from "../repositories/wifiRepository.js";

export async function createWifi (user: UserToken, wifiData: CreateWifiData) {
    
    const wifi = await wifiRepository.checkForWifiTitle(user, wifiData.title);

    if (wifi) {
        throw {
            type: 'conflict',
            message: 'Wifi: title already in use'
        };
    }

    const cryptr = new Cryptr(process.env.JWT_SECRET);

    const encryptPassword = cryptr.encrypt(wifiData.password);
    wifiData.password = encryptPassword;

    await wifiRepository.insertWifiData(user, wifiData);

}

export async function getWifi_One (user: UserToken, wifiData: number) {

    const wifi = await wifiRepository.getWifiData_One(user, wifiData);

    if (!wifi) {
        throw {
            type: 'not_found',
            message: 'Wifi: not found'
        };
    }

    const cryptr = new Cryptr(process.env.JWT_SECRET);

    const decryptedPassword = cryptr.decrypt(wifi.password);
    wifi.password = decryptedPassword;
    
    return wifi;

}

export async function getWifi_All (user: UserToken) {

    const wifis = await wifiRepository.getWifiData_All(user);

    wifis.forEach((wifi) => {
        const cryptr = new Cryptr(process.env.JWT_SECRET);
        const decryptedString = cryptr.decrypt(wifi.password);
        wifi.password = decryptedString;
    });

    return wifis;
}

export async function deleteWifiData (user: UserToken, wifiId: number) {

    const wifi = await wifiRepository.getWifiData_One(user, wifiId);

    if (!wifi) {
        throw {
            type: 'not_found',
            message: 'Wifi: not found'
        };
    }

    await wifiRepository.deleteWifiData(user, wifiId);

    return;

}