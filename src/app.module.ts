import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MovieModule } from './api/movie/movie.module'
import envConfig from './config/environment.config'
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
  ],
})
export class AppModule {}
