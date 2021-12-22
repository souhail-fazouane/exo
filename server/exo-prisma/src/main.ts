import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: {
    origin:"*",
    allowedHeaders: "*",
    exposedHeaders: "*"
  } });
  await app.listen(8080);
}
bootstrap();
