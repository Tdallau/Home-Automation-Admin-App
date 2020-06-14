import { CancelToken, CancelTokenSource, AxiosResponse } from 'axios';
import axios from 'axios';
import config from './config';
import { AsyncStorage } from 'react-native';
import { TokenSettings } from '../../models/authorization/user';
import { tokenSettingKey } from '../../config';

export type Request = {
  headers?: {};
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: {};
  body?: {};
};

export type GetRequest = {
  endpoint: string;
  query?: {};
  options?: {};
  target?: string;
};

export type PostRequest = {
  endpoint: string;
  body: {};
  options?: {};
  target?: string;
  cancelToken?: CancelToken;
};

export type DeleteRequest = {
  endpoint: string;
  options?: {};
  target?: string;
};

class Http {
  constructor() {
    axios.interceptors.response.use(
      (response) => {
        // console.log(response)
        // if (response.status === 401) {
        //   alert('You are not authorized');
        // }
        // if (response.status === 204) {
        //   Promise.reject('No content found!');
        //   return;
        // }

        return response;
      },
      (error) => {
        if (error.response && error.response.data) {
          return Promise.reject(error.response.data);
        }
        return Promise.reject(error.message);
      }
    );
  }
  private async setDefaultRequestOptions(
    request: Request,
    url: string
  ): Promise<Request> {
    const token = await this.getTokenHeader(url);
    return {
      ...request,
      headers: {
        'Content-Type': 'application/json',
        ...request.headers,
        ...token,
      },
      method: request.method || 'GET',
      data: request.body,
    };
  }

  private createQueryString<T extends {}>(query: T, url: string): string {
    let queryString = '';
    for (var i in query) {
      if (queryString.length > 0) {
        queryString += '&';
      }
      if (query[i] !== undefined) {
        queryString += `${i}=${query[i]}`;
      }
    }

    return `${url}${queryString.length > 0 ? '?' + queryString : ''}`;
  }

  private async getTokenHeader(url: string): Promise<{ token: string } | {}> {
    // const state = await store.getState();
    let obj: { token: string } | {} = {};
    if (!url.includes('authorization')) {
      const tokens = await AsyncStorage.getItem(tokenSettingKey);
      if (tokens) {
        const tokenSettings = JSON.parse(tokens) as TokenSettings;
        obj = {
          Authorization: `Bearer ${tokenSettings.jwtToken}`,
        };
      }
    }
    return obj;
  }

  // private async checkInternetConnection(): Promise<void> {
  //   const networkStatus = await NetInfo.fetch();
  //   if (!networkStatus.isConnected) {
  //     store.dispatch(changeConnectionModalStatus(true));
  //     throw new Error('Geen connectie');
  //   }
  // }

  private async sendRequest<Q extends {}, T>(options: {
    request: Request;
    url: string;
    queryObject?: Q;
    cancelToken?: CancelToken;
  }): Promise<T | null> {
    // try {
    //   await this.checkInternetConnection();
    // } catch (error) {
    //   console.log(error);
    //   return;
    // }
    let url = options.url;
    if (options.queryObject) {
      url = this.createQueryString(options.queryObject, options.url);
    }
    let requestOptions = await this.setDefaultRequestOptions(
      options.request,
      url
    );

    let result: AxiosResponse<T>;
    try {
      result = await axios({
        url,
        ...requestOptions,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
    if (result && result.data) {
      return result.data;
    }
    return null;
  }

  public async get<T>(options: GetRequest): Promise<T | null> {
    const allOptions: GetRequest = {
      ...{ target: config.main_api_url, options: {}, query: {} },
      ...options,
    };
    const url = `${allOptions.target}${allOptions.endpoint}`;
    return await this.sendRequest({
      request: { ...allOptions, method: 'GET', ...allOptions.options },
      url,
      queryObject: allOptions.query,
    });
  }

  public async post<T>(options: PostRequest): Promise<T | null> {
    const allOptions: PostRequest = {
      ...{ target: config.main_api_url, options: {} },
      ...options,
    };
    const url = `${allOptions.target}${allOptions.endpoint}`;
    return await this.sendRequest({
      request: { ...allOptions, method: 'POST', ...allOptions.options },
      url,
    });
  }

  public async delete<T>(options: DeleteRequest): Promise<T | null> {
    const allOptions: DeleteRequest = {
      ...{ target: config.main_api_url, options: {} },
      ...options,
    };
    const url = `${allOptions.target}${allOptions.endpoint}`;
    return await this.sendRequest({
      request: { ...allOptions, method: 'DELETE', ...allOptions.options },
      url,
    });
  }

  public async put<T>(options: PostRequest): Promise<T | null> {
    const allOptions: PostRequest = {
      ...{ target: config.main_api_url, options: {} },
      ...options,
    };
    const url = `${allOptions.target}${allOptions.endpoint}`;
    return await this.sendRequest({
      request: { ...allOptions, method: 'PUT', ...allOptions.options },
      url,
    });
  }
}

const http = new Http();
export default http;
