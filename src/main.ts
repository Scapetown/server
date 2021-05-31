import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import config from '@config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix(config.server.prefix);
  await app.listen(config.server.port);
}
bootstrap();
