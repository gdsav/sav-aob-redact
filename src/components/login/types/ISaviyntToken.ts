export interface ISaviyntToken { 
    username : string,
    roles : [ string ],
    token_type : string,
    access_token: string;
    expiresin : number;
    refresh_token : string;
}