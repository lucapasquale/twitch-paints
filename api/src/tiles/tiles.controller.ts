import { Body, Controller, Get, Post } from '@nestjs/common'

import { UsersService } from '../users/users.service'
import { TilesService } from './tiles.service'

type PostTileBody = {
  userName: string
  tile: {
    x: number
    y: number
    color: string
  }
}

@Controller('/tiles')
export class TilesController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tilesService: TilesService
  ) {}

  @Get('/board')
  async getBoard() {
    const tiles = await this.tilesService.getBoard()

    return {
      tiles,
    }
  }

  @Post()
  async postTile(@Body() body: PostTileBody) {
    const user = await this.usersService.upsert({ name: body.userName })

    const tile = await this.tilesService.save({
      ...body.tile,
      user,
    })

    return { tile }
  }
}
