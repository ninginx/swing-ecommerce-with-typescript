import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import { AppModule } from './app.module';
import { v4 } from 'uuid';

async function bootstrap() {
  const secret = v4();
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
      },
      secret: secret,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.enableCors({
    origin: process.env.ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  await app.listen(8080);
}
bootstrap();
