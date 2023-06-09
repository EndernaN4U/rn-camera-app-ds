import * as SecureStore from 'expo-secure-store';

async function saveItem(key, value){
    await SecureStore.setItemAsync(key, value);
}

async function getItem(key){
    await SecureStore.getItemAsync(key);
}

export async function getIP(){
    let ip = await getItem('IP');
    if(!ip){
        ip = '192.168.1.1';
        await saveItem('IP', ip);
    }

    let port = await getItem('PORT');
    if(!port){
        port = '3000';
        await saveItem('PORT', port);
    }

    return { ip, port }
}

export async function setIP(ip, port){
    await saveItem('IP', ip);
    await saveItem('PORT', port);
}