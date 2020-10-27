import { Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { LiteflixModule } from 'src/services/liteflix/liteflix.module'
import { TmdbModule } from 'src/services/tmdb/tmdb.module'
import { MovieHelper } from './helpers/movie.helper'
import { MovieController } from './movie.controller'
import { MovieService } from './movie.service'

@Module({
  imports: [TmdbModule, LiteflixModule],
  controllers: [MovieController],
  providers: [MovieService, Logger, ConfigService, MovieHelper],
})
export class MovieModule {}
