import { ISaviyntRequest } from "./ISaviyntRequest";

export interface ISaviyntRequests {
  msg: string;
  totalCount: number;
  count: number;
  errorCode: string;
  requests: [ISaviyntRequest];
}
