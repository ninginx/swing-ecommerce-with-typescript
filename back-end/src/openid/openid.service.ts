import { Injectable } from '@nestjs/common';
import { tokenExchangeResult } from './core/domain/Auth';
import { AuthUsecase } from './core/usecase/auth.usecase';
import GoogleAuth from './infra/google.auth';

@Injectable()
export class OpenIdService {
  private readonly authUsecase: AuthUsecase;
  constructor() {
    this.authUsecase = new AuthUsecase(new GoogleAuth());
  }

  tokenExchange = (
    grant_type: string,
    code: string,
    redirect_uri: string,
    client_id: string,
    code_verifier: string,
  ): Promise<tokenExchangeResult> => {
    return new Promise((resolve, reject) => {
      this.authUsecase
        .tokenExchange(grant_type, code, redirect_uri, client_id, code_verifier)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}
