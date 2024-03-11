import { AxiosError } from 'axios';

export interface AxiosHttpResponse<T> {
  error: AxiosError<{ [key: string]: string }> | null;
  data: T | null;
  statusCode: number;
}
