import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OidcController } from './openid/openid.controller';
import { OpenIdService } from './openid/openid.service';
import { ProductController } from './products/product.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, OidcController, ProductController],
  providers: [AppService, OpenIdService],
})
export class AppModule {}
