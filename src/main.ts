import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app/app.module';
import { ResponseInterceptor } from '@filters/response.interceptor';

import config from '@config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix(config.server.prefix);
  await app.listen(config.server.port);
}
bootstrap();
