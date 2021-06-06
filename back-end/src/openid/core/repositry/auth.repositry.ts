import { tokenExchangeResult, userInfo } from '../domain/Auth';

export interface GoogleAuthRepositry {
  tokenExchange(
    grant_type: string,
    code: string,
    redirect_uri: string,
    client_id: string,
    //  code_verifier: string,
  ): Promise<tokenExchangeResult>;

  getUserInfo(access_token: string): Promise<userInfo>;

  //saveUserInfo(userInfo: userInfo): Promise<void>;
}
