import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PubSub } from 'graphql-subscriptions'

import { UsersModule } from '../users/users.module'

import { Tile } from './tile.entity'
import { TilesController } from './tiles.controller'
import { TilesResolver } from './tiles.resolver'
import { TilesService } from './tiles.service'

@Module({
  imports: [TypeOrmModule.forFeature([Tile]), UsersModule],
  providers: [
    TilesService,
    TilesResolver,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  controllers: [TilesController],
})
export class TilesModule {}
