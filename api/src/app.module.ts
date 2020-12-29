import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CommonModule } from './common/common.module'
import { SnakeNamingStrategy } from './common/snake-naming-strategy'
import { TilesModule } from './tiles/tiles.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('pgUri'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),

    CommonModule,
    UsersModule,
    TilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
