import { config} from 'dotenv';
config();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = Number(process.env.PORT) || 4000;

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(PORT);
}
bootstrap();
