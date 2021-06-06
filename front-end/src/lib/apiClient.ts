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
      baseURL: process.env.BACKEND_API_URI,
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

      // const { headers } = config;

      this.execute(config)
        .then((response: AxiosResponse<unknown>) => {
          switch (response.status) {
            case 201:
              if (!isT(response.data)) {
                reject(new Error('型が不正です'));

                return;
              }
              resolve(response.data);

              return;
            case 400:
              reject(new Error('予期せぬエラーが発生しました'));

              return;
            default:
              reject(new Error('予期せぬエラーが発生しました'));
          }
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

export default ApiClient;
