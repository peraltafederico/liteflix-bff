import { CacheModule, Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { LiteflixModule } from 'src/services/liteflix/liteflix.module'
import { TmdbModule } from 'src/services/tmdb/tmdb.module'
import * as redisStore from 'cache-manager-redis-store'
import { MovieHelper } from './helpers/movie.helper'
import { MovieController } from './movie.controller'
import { MovieService } from './movie.service'

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('redisHost'),
        port: configService.get('redisPort'),
        auth_pass: configService.get('redisPass'),
      }),
      inject: [ConfigService],
    }),
    TmdbModule,
    LiteflixModule,
  ],
  controllers: [MovieController],
  providers: [MovieService, Logger, ConfigService, MovieHelper],
})
export class MovieModule {}
