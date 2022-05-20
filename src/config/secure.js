
import  CryptoJS from 'crypto-js'
import {configData} from './config.helper'

export const decryptLocalStorage =  (secureValue) => {

// Decrypt
try {
    var bytes  = CryptoJS.AES.decrypt(secureValue, configData.SECRET_KEY);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
} catch (ex) {
    console.log('failed to login');
    return;
}

}

export const encrptLocalStorage = (settingLocalStorage,storingLocalstorage)=>{
// Encrypt
var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(storingLocalstorage), configData.SECRET_KEY).toString();
localStorage.setItem(settingLocalStorage, JSON.stringify(ciphertext));
return ciphertext
}