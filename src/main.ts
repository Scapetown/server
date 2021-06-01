import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app/app.module';
import { ResponseInterceptor } from '@filters/response.interceptor';

import config from '@config/config';
import { Logger } from '@utils/logger';

async function bootstrap() {
  const logger = new Logger('server');
  logger.log('starting server');

  const app = await NestFactory.create(AppModule, {
    logger,
  });

  app.enableCors();
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix(config.server.prefix);
  await app.listen(config.server.port);
}
bootstrap();
