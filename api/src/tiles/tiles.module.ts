import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersModule } from '../users/users.module'

import { Tile } from './tile.entity'
import { TilesResolver } from './tiles.resolver'
import { TilesService } from './tiles.service'

@Module({
  imports: [TypeOrmModule.forFeature([Tile]), UsersModule],
  providers: [TilesService, TilesResolver],
  exports: [TilesService],
})
export class TilesModule {}
