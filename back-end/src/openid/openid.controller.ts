import { Body, Controller, Post } from '@nestjs/common';
import { tokenExchangeResult } from './core/domain/Auth';
import { OpenIdService } from './openid.service';

@Controller('oidc')
export class OidcController {
  constructor(private readonly openIdService: OpenIdService) {}

  @Post()
  async idTokenExchange(
    @Body()
    body: {
      grant_type: string;
      client_id: string;
      redirect_uri: string;
      code: string;
      codeVerifier: string;
    },
  ): Promise<tokenExchangeResult> {
    return new Promise((resolve, reject) => {
      this.openIdService
        .tokenExchange(
          body.grant_type,
          body.code,
          body.redirect_uri,
          body.client_id,
          body.codeVerifier,
        )
        .then((idToken) => {
          resolve(idToken);
          return;
        })
        //Fix: Slack 通知飛ばすべべ？
        .catch((error: Error) => reject(error));
    });
  }
}
