import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

declare module 'express-session' {
  interface SessionData {
    isLogin: boolean;
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() request: Request): string {
    request.session.isLogin = !request.session.isLogin;
    console.log(request.session.isLogin);
    return request.session.id;
  }
}
