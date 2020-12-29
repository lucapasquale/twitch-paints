import { Controller, Get } from '@nestjs/common'

import { TilesService } from './tiles.service'

@Controller('/tiles')
export class TilesController {
  constructor(private readonly tilesService: TilesService) {}

  @Get('/board')
  async getBoard() {
    const tiles = await this.tilesService.getBoard()

    return {
      tiles,
    }
  }
}
