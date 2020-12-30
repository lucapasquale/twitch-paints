import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from './user.entity'

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private userRepo: Repository<User>

  async upsert(user: Pick<User, 'name'>): Promise<User> {
    const existingUser = await this.userRepo.findOne({ name: user.name })
    if (existingUser) {
      return existingUser
    }

    return await this.userRepo.save(user)
  }
}
