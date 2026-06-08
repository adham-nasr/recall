import Storage from 'expo-sqlite/kv-store';

const CACHE_KEY = 'data';

export const persister = {
    persistClient: async (client:any)=>{
        await Storage.setItem(
            CACHE_KEY,
            JSON.stringify(client)
        );
    },
    restoreClient: async ()=> {
        const client = await Storage.getItem(CACHE_KEY)
        if(!client)
            return undefined;
        return JSON.parse(client);
    },
    removeClient: async ()=>{
        await Storage.removeItem(CACHE_KEY);
    }
}
