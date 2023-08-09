import { IAzureRegisteredApplication } from "./IAzureRegisteredApplication";
export interface IAzureRegisteredApplications {
  odataContext: string;
  value: [ IAzureRegisteredApplication ];
}
