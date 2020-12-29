import { PubSub } from 'graphql-subscriptions'
import { Query, Resolver, Subscription } from '@nestjs/graphql'

import { Tile } from './tile.entity'
import { TilesService } from './tiles.service'

const pubSub = new PubSub()

@Resolver()
export class TilesResolver {
  constructor(private readonly tilesService: TilesService) {}

  @Query(() => [Tile])
  async board() {
    return await this.tilesService.getBoard()
  }

  @Subscription(() => Boolean)
  commentAdded() {
    return pubSub.asyncIterator('commentAdded')
  }
}
