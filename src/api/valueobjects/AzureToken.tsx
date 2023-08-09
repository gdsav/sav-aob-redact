import {IAzureToken}from "../interfaces/IAzureToken";

class AzureToken implements IAzureToken {
    
    token_type: string = '';
    expires_in: number = 0;
    ext_expires_in: number = 0;
    access_token: string = ''; 

    public constructor (init? : IAzureToken) { 
        Object.assign(this, init);
    }

}