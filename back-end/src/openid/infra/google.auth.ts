import ApiClient from '../../utils/ApiClient';
import {
  tokenExchangeResult,
  isIdToken,
  userInfo,
  isUserInfo,
} from '../core/domain/Auth';

class GoogleAuth {
  public tokenExchange = (
    grant_type: string,
    code: string,
    redirect_uri: string,
    client_id: string,
    // code_verifier: string,
  ): Promise<tokenExchangeResult> => {
    return new Promise((resolve, reject) => {
      if (!process.env.TOKEN_ENDPOINT) {
        reject(new Error('環境変数:TOKEN_ENDPOINTが設定されていません'));
        return;
      }
      if (!process.env.OIDC_CLIENT_SECRET) {
        reject(new Error('環境変数:OIDC_CLIENT_SECRETが設定されていません'));
        return;
      }
      const params = new URLSearchParams();
      params.append('code', code);
      params.append('client_id', client_id);
      params.append('client_secret', process.env.OIDC_CLIENT_SECRET);
      params.append('redirect_uri', redirect_uri);
      params.append('grant_type', grant_type);
      //params.append('code_verifier', code_verifier);

      ApiClient.request(
        {
          method: 'post',
          url: `${process.env.TOKEN_ENDPOINT}/token`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: params,
        },
        isIdToken,
      )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  public getUserInfo = (access_token: string): Promise<userInfo> => {
    return new Promise((resolve, reject) => {
      if (!process.env.GOOGLE_API_ENDPOINT) {
        reject(new Error('環境変数:GOOGLE_API_ENDPOINTが設定されていません'));
        return;
      }
      ApiClient.request(
        {
          method: 'get',
          url: `${process.env.GOOGLE_API_ENDPOINT}/userinfo/v2/me`,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
        isUserInfo,
      )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}

export default GoogleAuth;
