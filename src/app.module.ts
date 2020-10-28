import { Module, CacheModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as redisStore from 'cache-manager-redis-store'
import { MovieModule } from './api/movie/movie.module'
import envConfig from './config/environment.config'
import { CacheHelper } from './commons/helpers/cache.helper'
import { LiteflixModule } from './services/liteflix/liteflix.module'
import { TmdbModule } from './services/tmdb/tmdb.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      isGlobal: true,
    }),
    LiteflixModule,
    TmdbModule,
    MovieModule,
    CacheModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('redisHost'),
        port: configService.get('redisPort'),
        auth_pass: configService.get('redisPass'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CacheHelper],
})
export class AppModule {}
