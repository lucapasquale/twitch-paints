import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { config } from './config'
import { Logger } from './logger'
import { GraphqlLoggingPlugin } from './logger/graphql-logger.plugin'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: getEnvFilePath(),
    }),
  ],
  providers: [Logger, GraphqlLoggingPlugin],
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
