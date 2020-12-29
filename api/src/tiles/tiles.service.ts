import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Tile } from './tile.entity'

@Injectable()
export class TilesService {
  @InjectRepository(Tile)
  private tileRepo: Repository<Tile>

  async getBoard() {
    return await this.tileRepo
      .createQueryBuilder('tiles')
      .distinctOn(['tiles.x', 'tiles.y'])
      .orderBy('tiles.x')
      .addOrderBy('tiles.y')
      .addOrderBy('tiles.created_at')
      .getMany()
  }

  async save(tile: Partial<Tile>) {
    return await this.tileRepo.save(tile)
  }
}
