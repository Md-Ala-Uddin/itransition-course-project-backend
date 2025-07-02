import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT ?? 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: CORS_ORIGIN,
    crendentials: true,
  });

  await app.listen(PORT);
}
bootstrap()
  .then(() => console.log(`Server is running on port ${PORT}`))
  .catch((err) => console.error('Error starting server:', err));
