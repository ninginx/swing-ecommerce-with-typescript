import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3, PutObjectCommand } from '@aws-sdk/client-s3';
//import { Request, Response } from 'express';

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

@Controller('product')
export class ProductController {
  //constructor(private readonly openIdService: OpenIdService) {}

  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  async register(
    @UploadedFile()
    picture: Express.Multer.File,
    @Body()
    body: {
      name: string;
      category: string;
      description: string;
      price: number;
    },
    //@Req() req: Request,
    //@Res() res: Response,
  ): Promise<string> {
    console.log('File', picture);
    console.log('body', body);
    const putCommand = new PutObjectCommand({
      Bucket: 'ec-swing-image',
      Key: picture.fieldname,
      Body: picture.buffer,
    });
    const credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_SECRET_KEY!,
    };
    const s3client = new S3({
      region: 'ap-northeast-1',
      credentials,
    });
    s3client.send(putCommand).catch((err) => console.error(err));
    return 'Jello';
  }
  // @Get('/logout')
  // logout(@Req() req: Request, @Res() res: Response): string {
  //   req.session.destroy((_err) => {
  //     return res.status(201).json('logout');
  //   });
  //   return 'logout?';
  // }
}
