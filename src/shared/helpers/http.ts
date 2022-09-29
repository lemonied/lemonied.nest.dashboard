import axios, { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';

export const http$ = <D=any, R=any>(config: AxiosRequestConfig<D>) => {
  const controller = new AbortController();
  const instance = axios.create({
    signal: controller.signal,
    baseURL: process.env.REACT_APP_API_PATH || '',
  });
  return new Observable<R>(subscriber => {
    instance(config).then(res => {
      subscriber.next(res.data);
      subscriber.complete();
    }).catch(err => {
      subscriber.error(err);
    });
    return {
      unsubscribe() {
        controller.abort();
      },
    };
  });
};

export const get$ = <P=any, R=any>(url: string, params?: P) => {
  return http$<P, R>({
    method: 'get',
    params,
    url,
  });
};

export const post$ = <D=any, R=any>(url: string, data?: D) => {
  return http$<D, R>({
    method: 'post',
    data,
    url,
  });
};
