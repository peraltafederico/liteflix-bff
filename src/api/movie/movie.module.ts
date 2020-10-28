import { CacheModule, Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { LiteflixModule } from 'src/services/liteflix/liteflix.module'
import { TmdbModule } from 'src/services/tmdb/tmdb.module'
import * as redisStore from 'cache-manager-redis-store'
import { CacheHelper } from 'src/commons/helpers/cache.helper'
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
        ttl: 1800,
      }),
      inject: [ConfigService],
    }),
    TmdbModule,
    LiteflixModule,
  ],
  controllers: [MovieController],
  providers: [MovieService, Logger, ConfigService, CacheHelper, MovieHelper],
})
export class MovieModule {}
