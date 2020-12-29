import { Module } from '@nestjs/common'

import { TwitchService } from './twitch.service'

@Module({
  imports: [],
  providers: [TwitchService],
})
export class TwitchModule {}
