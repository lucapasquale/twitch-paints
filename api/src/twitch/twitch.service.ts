import * as fs from 'fs'
import { ConfigService } from '@nestjs/config'
import { PubSubEngine } from 'graphql-subscriptions'
import { Inject, Injectable, OnModuleInit } from '@nestjs/common'

import { RefreshableAuthProvider, StaticAuthProvider } from 'twitch-auth'
import { ChatClient } from 'twitch-chat-client'

import { TilesService } from '../tiles/tiles.service'
import { TILE_UPDATED_NAME } from '../tiles/tiles.resolver'
import { UsersService } from '../users/users.service'

import { parseMessage } from './logic'

@Injectable()
export class TwitchService implements OnModuleInit {
  private client: ChatClient

  constructor(
    @Inject('PUB_SUB')
    private readonly pubSub: PubSubEngine,
    private readonly tilesService: TilesService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
  ) {}

  async onModuleInit() {
    const auth = this.generateAuth()

    this.client = new ChatClient(auth, { channels: ['luke094'] })
    await this.client.connect()

    this.client.onMessage(async (_: string, userName: string, message: string) => {
      const parsedMessage = parseMessage(message)
      if (!parsedMessage) {
        return null
      }

      const user = await this.usersService.upsert({ name: userName })
      const tile = await this.tilesService.save({ user, ...parsedMessage })

      this.pubSub.publish(TILE_UPDATED_NAME, { [TILE_UPDATED_NAME]: tile })
      return tile
    })
  }

  private generateAuth() {
    const tokenData = JSON.parse(fs.readFileSync('./tokens.json', { encoding: 'utf-8' }))

    return new RefreshableAuthProvider(
      new StaticAuthProvider(this.configService.get('twitch.clientId'), tokenData.accessToken),
      {
        clientSecret: this.configService.get('twitch.clientSecret'),
        refreshToken: tokenData.refreshToken,
        expiry: tokenData.expiryTimestamp === null ? null : new Date(tokenData.expiryTimestamp),
        onRefresh: async ({ accessToken, refreshToken, expiryDate }) => {
          const newTokenData = {
            accessToken,
            refreshToken,
            expiryTimestamp: expiryDate === null ? null : expiryDate.getTime(),
          }

          fs.writeFileSync('./tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8')
        },
      }
    )
  }
}
