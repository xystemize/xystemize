import { AxiosError } from 'axios';

export interface HttpResponse<T> {
  error: Error | AxiosError<{ [key: string]: string }> | null;
  data: T | null;
}
