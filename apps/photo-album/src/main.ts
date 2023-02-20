/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { graphqlUploadExpress } from 'graphql-upload';
import { existsSync, mkdir, mkdirSync } from 'fs';
import { join } from 'path';
import { UPLOAD_DIR } from './constants/storage';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // uploads directory
  const dir = UPLOAD_DIR;
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  app.use(graphqlUploadExpress({ maxFileSize: 5000000 }));
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
