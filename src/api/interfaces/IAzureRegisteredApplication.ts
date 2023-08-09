export interface IAzureRegisteredApplication { 
    id: string;
    displayName: string;
    homePageUrl: string;
    supportedSingleSignOnMode: [string];
    supportedProvisioningTypes: [string];
    logoUrl: string;
    categories: [string];
    publisher: string;
    description: string;
    createdDateTime : string;

}