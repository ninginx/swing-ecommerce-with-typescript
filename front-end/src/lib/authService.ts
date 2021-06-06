import { v4 } from 'uuid';

import ApiClient from './apiClient';

// import QueryStringUtils from './queryStringUtils';

if (typeof process.env.NEXT_PUBLIC_AUTHORIZATION_END_POINT === 'undefined') {
  throw new Error('環境変数:認証エンドポイントが設定されていません');
}

if (typeof process.env.NEXT_PUBLIC_TOKEN_END_POINT === 'undefined') {
  throw new Error('環境変数:トークンエンドポイントが設定されていません');
}

if (typeof process.env.NEXT_PUBLIC_CLIENT_ID === 'undefined') {
  throw new Error('環境変数:Client Idが設定されていません');
}
const config = {
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  authorizedCallbackUri: `http://localhost:3000/signin/callback`,
  endpoints: {
    authorization: process.env.NEXT_PUBLIC_AUTHORIZATION_END_POINT,
    token: process.env.NEXT_PUBLIC_TOKEN_END_POINT,
  },
};

// const queryParser = new QueryStringUtils();

class AuthService {
  private readonly $apiClient: ApiClient;
  constructor(apiClient: ApiClient) {
    this.$apiClient = apiClient;
  }

  public authorize = (): string => {
    const nonce = v4();
    const params = new URLSearchParams();
    params.append('client_id', config.clientId);
    params.append('redirect_uri', config.authorizedCallbackUri);
    params.append('response_type', 'code');
    params.append('nonce', nonce);
    params.append('scope', 'openid email profile');

    return `${config.endpoints.authorization}?${params.toString()}`;
  };

  public login = (urlParam: { code: string }): Promise<any> =>
    new Promise((resolve, _reject) => {
      // const data = new URLSearchParams();
      // data.append('code', decodeURI(urlParam.code));
      // data.append('grant_type', 'authorization_code');
      // data.append('redirect_uri', config.authorizedCallbackUri);
      // data.append('client_id', config.clientId);

      const data = {
        code: decodeURIComponent(urlParam.code),
        grant_type: 'authorization_code',
        client_id: config.clientId,
        redirect_uri: config.authorizedCallbackUri,
      };

      this.$apiClient
        .request(
          {
            method: 'post',
            url: config.endpoints.token,
            headers: {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            },
            data,
          },
          this.isAuthorizationCode,
        )
        .then((res) => {
          console.log('res', res);
          resolve(res);
        })
        .catch((err) => console.error(err));
    });
  // this.$apiClient.request(
  //   {
  //     method: 'post',
  //     url: config.endpoints.token,
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //   },
  //   this.isAuthorizationCode,
  // );

  private isAuthorizationCode = (arg: any): arg is any => true;
}

const authService = new AuthService(new ApiClient());
export default authService;
