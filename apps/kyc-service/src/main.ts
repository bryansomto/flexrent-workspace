import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Allow only your frontend
  });

  // 2. Change port to 3001 to avoid conflict
  await app.listen(3001);
  console.log('KYC Service is running on: http://localhost:3001');
}
bootstrap();
