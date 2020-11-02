import { CACHE_MANAGER, Inject } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cache } from 'cache-manager'
import { Genre } from 'src/api/movie/dto/genre.dto'
import { TmbdService } from 'src/services/tmdb/tmdb.service'
import { TmdbConfig } from '../interfaces'

export class CacheHelper {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly tmdbService: TmbdService,
    private configService: ConfigService
  ) {}

  async getTmdbConfig(): Promise<TmdbConfig> {
    const tmdbConfig = await this.cache.wrap(
      'tmdbConfig',
      async (): Promise<string> => {
        const config = await this.tmdbService.getConfig().toPromise()

        return JSON.stringify(config)
      },
      { ttl: this.configService.get('tmdbConfigTtl') }
    )

    return JSON.parse(tmdbConfig)
  }

  async getGenres(): Promise<Genre[]> {
    const genres = await this.cache.wrap(
      'genres',
      async (): Promise<string> => {
        const config = await this.tmdbService.getGenres().toPromise()

        return JSON.stringify(config)
      },
      { ttl: this.configService.get('genresTtl') }
    )
    return JSON.parse(genres)
  }
}
