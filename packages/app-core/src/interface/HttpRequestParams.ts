import { AxiosRequestConfig } from 'axios';

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface HttpRequestParams {
  [key: string]: any;
}

export interface HttpRequestInterface {
  baseUrl: string;
  endpoint: string;
  params?: HttpRequestParams;
  config?: AxiosRequestConfig;
}
