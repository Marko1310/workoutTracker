import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { ZodExceptionFilter } from 'shared/zod-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = app.get(Logger);
  const config = app.get(ConfigService);
  const port = config.get<number>('app.port');
  const clientUrl = config.get<string>('app.clientUrl');
  const serverPing = config.get<string>('app.serverPing');

  app.enableCors({
    credentials: true,
    origin: [clientUrl, serverPing],
  });

  app.use(cookieParser());

  app.useLogger(logger);
  app.useGlobalFilters(new ZodExceptionFilter());

  await app.listen(port, () => {
    logger.log(`🚀 Application is listening on port ${port}`);
  });
}
bootstrap();
