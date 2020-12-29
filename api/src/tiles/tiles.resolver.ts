import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSubEngine } from 'graphql-subscriptions'

import { UsersService } from '../users/users.service'

import { Tile } from './tile.entity'
import { TilesService } from './tiles.service'

const TILE_UPDATED_NAME = 'tileUpdated'

const TILE_COUNT = 20
const COLOR_CODES = {
  0: '#000000',
  1: '#FFFFFF',
  2: '#FF0000',
  3: '#00FF00',
  4: '#0000FF',
  5: '#FFFF00',
  6: '#FF00FF',
  7: '#00FFFF',
}

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
    @Args({ name: 'colorCode', type: () => Int }) colorCode: number
  ) {
    if (x >= TILE_COUNT || y >= TILE_COUNT) {
      throw new Error('invalid position')
    }

    const color = COLOR_CODES[colorCode]
    if (!color) {
      throw new Error('invalid color')
    }

    const user = await this.usersService.upsert({ name: 'luca' })
    const tile = await this.tilesService.save({ x, y, color, user })

    this.pubSub.publish(TILE_UPDATED_NAME, { [TILE_UPDATED_NAME]: tile })
    return tile
  }

  @Subscription(() => Tile, { name: TILE_UPDATED_NAME })
  tileUpdated() {
    return this.pubSub.asyncIterator(TILE_UPDATED_NAME)
  }
}
