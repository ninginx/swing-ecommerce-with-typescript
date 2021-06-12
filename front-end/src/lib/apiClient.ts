import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

if (typeof process.env.NEXT_PUBLIC_BACK_END_API === 'undefined') {
  throw new Error();
}

class ApiClient {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      withCredentials: true,
      baseURL: process.env.NEXT_PUBLIC_BACK_END_API,
    });
  }

  public request = async <T>(config: AxiosRequestConfig = {}): Promise<T> =>
    new Promise((resolve, reject) => {
      this.execute(config)
        .then((response) => {
          // if (!isT(response)) {
          //   reject(new Error('response型が不正です'));

          //   return;
          // }
          resolve(response.data as T);
        })
        .catch((error) => {
          reject(error);
        });
    });

  private execute = async <T>(
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> =>
    new Promise((resolve, reject) => {
      this.client
        .request<T>(config)
        .then((res: AxiosResponse) => {
          resolve(res);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
}

export default new ApiClient();
