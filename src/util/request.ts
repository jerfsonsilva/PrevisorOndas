import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RequestConfig extends AxiosRequestConfig {}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Response<T = any> extends AxiosResponse<T> {}

export class Request {
  constructor(private request = axios) {}

  public get<T>(url: string, config: RequestConfig): Promise<Response<T>> {
    return this.request.get<T, Response<T>>(url, config)
  }

  public static extractErrorData(error: unknown): {
    data: any
    status: number
  } {
    const axiosError = error as AxiosError
    if (axiosError.response && axiosError.response.status) {
      return {
        data: axiosError.response.data,
        status: axiosError.response.status,
      }
    }
    throw Error(`${error} is not a request error`)
  }
}