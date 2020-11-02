import { CacheModule, Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as redisStore from 'cache-manager-redis-store'
import { TmdbModule } from '../../services/tmdb/tmdb.module'
import { CacheHelper } from '../../commons/helpers/cache.helper'
import { LiteflixModule } from '../../services/liteflix/liteflix.module'
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
  providers: [MovieService, Logger, ConfigService, CacheHelper, MovieHelper],
})
export class MovieModule {}
