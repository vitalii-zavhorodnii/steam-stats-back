import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  await app.listen(port || 4000);
})();
