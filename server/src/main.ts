import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { credentials: true, origin: '*' },
  });
  app.use(cookieParser());
  await app.listen(env.PORT ?? 5000);
}

bootstrap().then(() => {
  console.log(`env.PORT : ${env.PORT}`);
});
