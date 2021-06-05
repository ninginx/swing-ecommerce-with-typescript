import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

class ApiClient {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      withCredentials: true,
    });
  }

  public request = async <T>(
    config: AxiosRequestConfig = {},
    isT: (arg: unknown) => arg is T,
  ): Promise<T> =>
    new Promise((resolve, reject) => {
      // id tokenの検証を行い、アウトならrefresh tokenを発行する
      // const idToken = localstrage(idToken)
      // if(!verficaition(idToken)){ authService.refresh() }
      this.execute(config)
        .then((response: AxiosResponse<unknown>) => {
          if (!isT(response)) {
            reject(new Error('レスポンス型が不正です'));
            return;
          }
          resolve(response);
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
          resolve(res.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
}

export default new ApiClient();
