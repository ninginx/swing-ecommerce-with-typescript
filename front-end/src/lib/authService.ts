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

if (typeof process.env.NEXT_PUBLIC_ORIGIN === 'undefined') {
  throw new Error('環境変数:ORIGINが設定されていません');
}

const config = {
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  authorizedCallbackUri: `${process.env.NEXT_PUBLIC_ORIGIN}/signin/callback`,
  endpoints: {
    authorization: process.env.NEXT_PUBLIC_AUTHORIZATION_END_POINT,
    token: process.env.NEXT_PUBLIC_TOKEN_END_POINT,
  },
};

// const queryParser = new QueryStringUtils();

class AuthService {
  private readonly $apiClient;
  constructor() {
    this.$apiClient = ApiClient;
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

  public login = (urlParam: { code: string }): Promise<userInfo> =>
    new Promise((resolve, _reject) => {
      const data = {
        code: decodeURIComponent(urlParam.code),
        grant_type: 'authorization_code',
        client_id: config.clientId,
        redirect_uri: config.authorizedCallbackUri,
      };

      this.$apiClient
        .request({
          method: 'post',
          url: '/oidc',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          data,
        })
        .then((res) => resolve(res as userInfo))
        .catch((err) => console.error(err));
    });
}

type userInfo = {
  id: string;
  email: string;
  picture: string;
  name: string;
};

const authService = new AuthService();
export default authService;
