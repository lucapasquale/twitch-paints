import { Controller, Get } from '@nestjs/common'

@Controller('status')
export class StatusController {
  @Get()
  async status() {
    return {
      status: 'ok',
    }
  }
}
