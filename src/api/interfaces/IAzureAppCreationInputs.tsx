import { IAzureCatalogEntry } from "../../api/interfaces/IAzureCatalogEntry";
import { IAzureToken } from "../../api/interfaces/IAzureToken";

export interface IAzureAppCreationInputs { 
    azureToken : IAzureToken;
    azureEntry : IAzureCatalogEntry;
}