import { IAzureCatalogEntry } from "./IAzureCatalogEntry";
export interface IAzureCatalog {
  odataContext: string;
  value: [ IAzureCatalogEntry

    /*
    {
      id: string;
      displayName: string;
      homePageUrl: string;
      supportedSingleSignOnMode: [string];
      supportedProvisioningTypes: [string];
      logoUrl: string;
      categories: [string];
      publisher: string;
      description: string;   
    }
    */
  ];
}
