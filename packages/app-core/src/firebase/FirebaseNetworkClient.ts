import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { isArray, last } from 'lodash';
import Supertest from 'supertest';

import * as appInterface from '../interface';
import { AxiosHttpResponse, HttpRequestInterface, HttpRequestParams, HttpResponse } from '../interface';
import { AppStringModel, ErrorString } from '../string';

export class FirebaseNetworkClient {
  static instance = new FirebaseNetworkClient();

  currentUser?: appInterface.FirebaseUser | null = null;

  supertestApi?: Supertest.SuperTest<Supertest.Test> | null = null;

  getRequestConfig = async (): Promise<AxiosRequestConfig> => {
    const newTokenResult = await this.currentUser?.getIdTokenResult();

    if (newTokenResult) {
      return {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${newTokenResult.token}`,
        },
      };
    }

    return {};
  };

  handleFirebaseResponse = async <T>(promise: Promise<T>): Promise<HttpResponse<T>> => {
    const response: HttpResponse<T> = { data: null, error: null };

    try {
      response.data = await promise;
    } catch (error) {
      const { code } = error || {};
      const errorString: AppStringModel = ErrorString[code] || ErrorString.Generic;
      response.error = errorString.error;
    }

    return response;
  };

  handleAxiosResponse = async <T>(promise: Promise<AxiosResponse<T>>): Promise<AxiosHttpResponse<T>> => {
    const response: AxiosHttpResponse<T> = { data: null, error: null, statusCode: 0 };

    try {
      const { data, status } = await promise;
      response.data = data;
      response.statusCode = status;
    } catch (error) {
      response.error = error;
    }

    return response;
  };

  handleSupertestResponse = async <T>({
    params,
    supertest,
    config,
    isGetMethod,
  }: {
    supertest: Supertest.Test;
    params?: HttpRequestParams;
    config: AxiosRequestConfig;
    isGetMethod?: boolean;
  }): Promise<AxiosHttpResponse<T>> => {
    const response: AxiosHttpResponse<T> = { data: null, error: null, statusCode: 0 };

    try {
      if (config.headers?.Authorization) {
        supertest.set('Authorization', config.headers?.Authorization);
      }

      if (params && isGetMethod) {
        supertest.query(params);
      }

      if (params && !isGetMethod) {
        supertest.send(params);
      }

      const { body, error, statusCode } = await supertest;

      response.statusCode = statusCode;

      if (statusCode >= 200 && statusCode <= 300) {
        response.data = body as T;
      }

      if (statusCode >= 400) {
        response.error = body;
      }

      if (error) {
        response.error = error as unknown as AxiosError<{ [key: string]: string }>;
      }
    } catch (error) {
      response.error = error;
    }

    return response;
  };

  get = async <T>(req: HttpRequestInterface) => {
    let endpointUrl = `${req.baseUrl}/${req.endpoint}`;
    const config = await this.getRequestConfig();
    config.params = req.params;

    if (this.supertestApi) {
      const apiController = last(req.baseUrl.split('/'));
      endpointUrl = `/${apiController}/${req.endpoint}`;

      return this.handleSupertestResponse<T>({
        supertest: this.supertestApi.get(endpointUrl),
        params: req.params,
        config,
        isGetMethod: true,
      });
    }

    return this.handleAxiosResponse<T>(axios.get(endpointUrl, config));
  };

  getOne = async <T extends { new (...args: unknown[]): InstanceType<T> }>(
    req: HttpRequestInterface & { classModel: T }
  ) => {
    const response = await this.get<InstanceType<T>>(req);

    if (response.data) {
      response.data = new req.classModel(response.data);
    }

    return response;
  };

  getMany = async <T extends { new (...args: unknown[]): InstanceType<T> }>(
    req: HttpRequestInterface & { classModel: T }
  ) => {
    const response = await this.get<InstanceType<T>[]>(req);

    if (isArray(response.data) && response.data?.length) {
      response.data = response.data.map((obj) => new req.classModel(obj));
    }

    return response;
  };

  post = async <T>(req: HttpRequestInterface) => {
    let endpointUrl = `${req.baseUrl}/${req.endpoint}`;
    const config = await this.getRequestConfig();

    if (this.supertestApi) {
      const apiController = last(req.baseUrl.split('/'));
      endpointUrl = `/${apiController}/${req.endpoint}`;

      return this.handleSupertestResponse<T>({
        supertest: this.supertestApi.post(endpointUrl),
        params: req.params,
        config,
      });
    }

    return this.handleAxiosResponse<T>(axios.post(endpointUrl, req.params, config));
  };

  postOne = async <T extends { new (...args: unknown[]): InstanceType<T> }>(
    req: HttpRequestInterface & { classModel: T }
  ) => {
    const response = await this.post<InstanceType<T>>(req);

    if (response.data) {
      response.data = new req.classModel(response.data);
    }

    return response;
  };

  put = async <T>(req: HttpRequestInterface) => {
    let endpointUrl = `${req.baseUrl}/${req.endpoint}`;
    const config = await this.getRequestConfig();

    if (this.supertestApi) {
      const apiController = last(req.baseUrl.split('/'));
      endpointUrl = `/${apiController}/${req.endpoint}`;

      return this.handleSupertestResponse<T>({
        supertest: this.supertestApi.put(endpointUrl),
        params: req.params,
        config,
      });
    }

    return this.handleAxiosResponse<T>(axios.put(endpointUrl, req.params, config));
  };

  putOne = async <T extends { new (...args: unknown[]): InstanceType<T> }>(
    req: HttpRequestInterface & { classModel: T }
  ) => {
    const response = await this.put<InstanceType<T>>(req);

    if (response.data) {
      response.data = new req.classModel(response.data);
    }

    return response;
  };

  patch = async <T>(req: HttpRequestInterface) => {
    let endpointUrl = `${req.baseUrl}/${req.endpoint}`;
    const config = await this.getRequestConfig();

    if (this.supertestApi) {
      const apiController = last(req.baseUrl.split('/'));
      endpointUrl = `/${apiController}/${req.endpoint}`;

      return this.handleSupertestResponse<T>({
        supertest: this.supertestApi.patch(endpointUrl),
        params: req.params,
        config,
      });
    }

    return this.handleAxiosResponse<T>(axios.patch(endpointUrl, req.params, config));
  };

  patchOne = async <T extends { new (...args: unknown[]): InstanceType<T> }>(
    req: HttpRequestInterface & { classModel: T }
  ) => {
    const response = await this.patch<InstanceType<T>>(req);

    if (response.data) {
      response.data = new req.classModel(response.data);
    }

    return response;
  };

  delete = async <T>(req: HttpRequestInterface) => {
    let endpointUrl = `${req.baseUrl}/${req.endpoint}`;
    const config = await this.getRequestConfig();
    config.data = req.params;

    if (this.supertestApi) {
      const apiController = last(req.baseUrl.split('/'));
      endpointUrl = `/${apiController}/${req.endpoint}`;

      return this.handleSupertestResponse<T>({
        supertest: this.supertestApi.delete(endpointUrl),
        params: req.params,
        config,
      });
    }

    return this.handleAxiosResponse<T>(axios.delete(endpointUrl, config));
  };

  deleteOne = async <T extends { new (...args: unknown[]): InstanceType<T> }>(
    req: HttpRequestInterface & { classModel: T }
  ) => {
    const response = await this.delete<InstanceType<T>>(req);

    if (response.data) {
      response.data = new req.classModel(response.data);
    }

    return response;
  };
}
