import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { userInfo } from './core/domain/Auth';
import { OpenIdService } from './openid.service';

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

@Controller('oidc')
export class OidcController {
  constructor(private readonly openIdService: OpenIdService) {}

  @Post()
  async login(
    @Body()
    body: {
      grant_type: string;
      client_id: string;
      redirect_uri: string;
      code: string;
      codeVerifier: string;
    },
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<userInfo> {
    return new Promise(() => {
      this.openIdService
        .tokenExchange(
          body.grant_type,
          body.code,
          body.redirect_uri,
          body.client_id,
        )
        .then((userInfo) => {
          console.log(req.session.userId);
          req.session.regenerate((_err) => {
            console.log(req.session.userId);
            req.session.userId = userInfo.id;
            return res.status(201).json(userInfo);
          });
        })
        //Fix: Slack 通知飛ばすべべ？
        .catch((error: Error) => {
          return res.status(401).json(error.message);
        });
    });
  }
  @Get('/logout')
  logout(@Req() req: Request, @Res() res: Response): string {
    req.session.destroy((_err) => {
      return res.status(201).json('logout');
    });
    return 'logout?';
  }
}
