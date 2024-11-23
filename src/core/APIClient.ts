import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {AppConstants} from '../constants/AppConstants';

export class APIClient {
  static instance: APIClient = new APIClient();

  private _axios: AxiosInstance;

  private constructor() {
    this._axios = axios.create({
      baseURL: AppConstants.baseUrl,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this._axios.interceptors.request.use(
      config => {
        if (process.env.NODE_ENV === 'development') {
          const curl = generateCurlCommand(config);
          console.log('Curl Command:', curl);

          console.log('Request:', {
            method: config.method,
            url: config.url,
            headers: config.headers,
            data: config.data,
          });
        }
        return config;
      },
      error => {
        console.error('Request Error:', error);
        return Promise.reject(error);
      },
    );

    this._axios.interceptors.response.use(
      response => {
        if (process.env.NODE_ENV === 'development') {
          console.log('Response:', {
            data: response.data,
            status: response.status,
            statusText: response.statusText,
          });
        }
        return response;
      },
      error => {
        if (process.env.NODE_ENV === 'development') {
          console.error('Response Error:', error.response || error.message);
        }
        return Promise.reject(error);
      },
    );
  }

  public async get(
    path: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    try {
      const response = await this._axios.get(path, config);
      return response;
    } catch (error) {
      throw this.handleError(error, 'GET', path);
    }
  }

  public async post(
    path: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    try {
      const response = await this._axios.post(path, data, config);
      return response;
    } catch (error) {
      throw this.handleError(error, 'POST', path);
    }
  }

  public async put(
    path: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    try {
      const response = await this._axios.put(path, data, config);
      return response;
    } catch (error) {
      throw this.handleError(error, 'PUT', path);
    }
  }

  public async delete(
    path: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    try {
      const response = await this._axios.delete(path, config);
      return response;
    } catch (error) {
      throw this.handleError(error, 'DELETE', path);
    }
  }

  private handleError(error: any, method: string, path: string): Error {
    return new Error(`Error in ${method} ${path}: ${error.message || error}`);
  }
}

function generateCurlCommand(config: any): string {
  const method = config.method?.toUpperCase() ?? 'GET';
  const url = config.baseURL + config.url;
  const headers = config.headers;

  let curlCommand = `curl -X ${method} '${url}'`;

  // Add headers to the curl command
  if (headers) {
    Object.keys(headers).forEach(key => {
      curlCommand += ` -H '${key}: ${headers[key]}'`;
    });
  }

  // If there's data (for POST, PUT, etc.), add it to the curl command
  if (config.data) {
    curlCommand += ` -d '${JSON.stringify(config.data)}'`;
  }

  return curlCommand;
}
