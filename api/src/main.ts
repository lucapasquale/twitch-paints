import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { Logger } from './common/logger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: new Logger(),
  })

  const configService = app.get(ConfigService)
  await app.listen(configService.get<number>('port'))
}
bootstrap()
