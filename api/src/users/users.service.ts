import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from './user.entity'

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private userRepo: Repository<User>

  async upsert(user: Partial<User>): Promise<User> {
    return await this.userRepo.save(user)
  }
}
