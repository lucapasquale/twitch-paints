import { Module } from '@nestjs/common'

import { TilesModule } from '../tiles/tiles.module'
import { UsersModule } from '../users/users.module'

import { TwitchService } from './twitch.service'

@Module({
  imports: [UsersModule, TilesModule],
  providers: [TwitchService],
})
export class TwitchModule {}
