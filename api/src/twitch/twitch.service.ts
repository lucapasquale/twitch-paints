import * as fs from 'fs'
import { RefreshableAuthProvider, StaticAuthProvider } from 'twitch-auth'
import { ChatClient } from 'twitch-chat-client'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class TwitchService implements OnModuleInit {
  private client: ChatClient

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const auth = this.generateAuth()

    this.client = new ChatClient(auth, { channels: ['luke094'] })
    await this.client.connect()

    this.client.onMessage(this.onMessage)
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

  private onMessage(channel: string, user: string, message: string) {
    console.log({ channel, user, message })
  }
}
