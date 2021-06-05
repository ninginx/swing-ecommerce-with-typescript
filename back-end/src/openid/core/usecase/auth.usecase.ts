import { tokenExchangeResult } from '../domain/Auth';
import { GoogleAuthRepositry } from '../repositry/auth.repositry';

export class AuthUsecase {
  private readonly googleAuthRepositry: GoogleAuthRepositry;
  constructor(googleAuthRepositry: GoogleAuthRepositry) {
    this.googleAuthRepositry = googleAuthRepositry;
  }
  public tokenExchange = (
    grant_type: string,
    code: string,
    redirect_uri: string,
    client_id: string,
    code_verifier: string,
  ): Promise<tokenExchangeResult> => {
    return new Promise((resolve, reject) => {
      this.googleAuthRepositry
        .tokenExchange(grant_type, code, redirect_uri, client_id, code_verifier)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}
