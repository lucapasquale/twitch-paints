import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { Logger } from './common/logger'
import { LoggingInterceptor } from './common/logger/logging.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new Logger() })

  app.useGlobalInterceptors(new LoggingInterceptor())

  const configService = app.get(ConfigService)
  await app.listen(configService.get<number>('port'))
}
bootstrap()
