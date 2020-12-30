import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSubEngine } from 'graphql-subscriptions'

import { UsersService } from '../users/users.service'

import { Tile } from './tile.entity'
import { TilesService } from './tiles.service'

export const TILE_UPDATED_NAME = 'tileUpdated'

@Resolver()
export class TilesResolver {
  constructor(
    @Inject('PUB_SUB')
    private readonly pubSub: PubSubEngine,
    private readonly tilesService: TilesService,
    private readonly usersService: UsersService
  ) {}

  @Query(() => [Tile])
  async board() {
    return await this.tilesService.getBoard()
  }

  @Mutation(() => Tile)
  async updateTile(
    @Args({ name: 'x', type: () => Int }) x: number,
    @Args({ name: 'y', type: () => Int }) y: number,
    @Args({ name: 'color', type: () => String }) color: string
  ) {
    const user = await this.usersService.upsert({ name: 'mutation' })
    const tile = await this.tilesService.save({ x, y, color, user })

    this.pubSub.publish(TILE_UPDATED_NAME, { [TILE_UPDATED_NAME]: tile })
    return tile
  }

  @Subscription(() => Tile, { name: TILE_UPDATED_NAME })
  tileUpdated() {
    return this.pubSub.asyncIterator(TILE_UPDATED_NAME)
  }
}
