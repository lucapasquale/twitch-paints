import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Tile } from './tile.entity'
import { TilesController } from './tiles.controller'
import { TilesService } from './tiles.service'

@Module({
  imports: [TypeOrmModule.forFeature([Tile])],
  providers: [TilesService],
  controllers: [TilesController],
})
export class TilesModule {}
