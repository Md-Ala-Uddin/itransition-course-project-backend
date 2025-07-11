import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT ?? 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: CORS_ORIGIN,
    crendentials: true,
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Recommended: Strip properties that are not defined in the DTO
      forbidNonWhitelisted: true, // Recommended: Throw an error if non-whitelisted properties are sent
      transform: true, // Essential: Transform plain JS object to DTO class instance
      // disableErrorMessages: false, // Set to true in production for security, false for development
    }),
  );

  await app.listen(PORT);
}
bootstrap()
  .then(() => console.log(`Server is running on port ${PORT}`))
  .catch((err) => console.error('Error starting server:', err));
