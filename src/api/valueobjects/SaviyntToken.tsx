import { ISaviyntToken }  from '../interfaces/ISaviyntToken';

export class SaviyntToken implements ISaviyntToken{ 
    username: string = '';
    roles: [string] = [''];
    tokenType: string = '';
    access_token: string = '';
    expires_in: number = 0;
    refresh_token: string = '';

    public constructor (init? : ISaviyntToken) { 
        Object.assign(this, init);
    }

}

function getToken(): Promise<ISaviyntToken> { 

    return fetch('url')
        .then (res => res.json)
        .then (res => { 
            return res as unknown as ISaviyntToken;
        })

}
