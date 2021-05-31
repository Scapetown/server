import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app/app.module';

import config from '@config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix(config.server.prefix);
  await app.listen(config.server.port);
}
bootstrap();
