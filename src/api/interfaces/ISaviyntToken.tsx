export interface ISaviyntToken { 
    username: string;
    roles: string[];
    tokenType: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
}
