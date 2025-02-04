import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

require('dotenv').config();
const PORT = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    allowedHeaders: 'Content-Type, Accept, Access-Control-Allow-Origin,Authorization',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
    origin: true,
  });
  app.use(cookieParser());
  app.use(
    cors({
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200,
      credentials: true,
    }),
  );
  await app.listen(PORT, () => {
    console.log(`Application is running on: http://localhost:${PORT}`);
  });
}

bootstrap();