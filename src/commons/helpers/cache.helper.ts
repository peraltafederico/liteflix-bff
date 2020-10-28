import { CACHE_MANAGER, Inject } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { TmbdService } from 'src/services/tmdb/tmdb.service'
import { TmdbConfig, TmdbGenre } from '../interfaces'

export class CacheHelper {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly tmdbService: TmbdService
  ) {}

  async getTmdbConfig(): Promise<TmdbConfig> {
    const tmdbConfig = await this.cache.wrap(
      'tmdbConfig',
      async (): Promise<string> => {
        const config = await this.tmdbService.getConfig().toPromise()

        return JSON.stringify(config)
      },
      { ttl: 1800 }
    )

    return JSON.parse(tmdbConfig)
  }

  async getGenres(): Promise<TmdbGenre[]> {
    const genres = await this.cache.wrap(
      'genres',
      async (): Promise<string> => {
        const config = await this.tmdbService.getGenres().toPromise()

        return JSON.stringify(config)
      },
      { ttl: 1800 }
    )
    return JSON.parse(genres)
  }
}
