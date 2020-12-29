import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { StatusController } from './status.controller'
import { config } from './config'
import { Logger } from './logger'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: getEnvFilePath(),
    }),
  ],
  controllers: [StatusController],
  providers: [Logger],
})
export class CommonModule {}

function getEnvFilePath() {
  switch (process.env.NODE_ENV) {
    case 'test':
      return 'env/.test.env'

    case 'dev':
      return 'env/.dev.env'

    default:
      return null
  }
}
