/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable class-methods-use-this */
import { CACHE_MANAGER, Inject } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { TmdbMovie } from 'src/commons/interfaces'
import { TmbdService } from 'src/services/tmdb/tmdb.service'

export class MovieHelper {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly tmdbService: TmbdService
  ) {}

  async parseTmdbMovies({
    featured,
    upcoming,
    popular,
  }: {
    featured: TmdbMovie
    upcoming: TmdbMovie[]
    popular: TmdbMovie[]
  }): Promise<any> {
    const tmdbConfig = await this.cache.wrap(
      'tmdbConfig',
      async (): Promise<string> => {
        const config = await this.tmdbService.getConfig().toPromise()

        return JSON.stringify(config)
      },
      { ttl: 1800 }
    )

    const { images } = JSON.parse(tmdbConfig)

    const getImgBaseUrl = (size: number): string =>
      `${images.secureBaseUrl}${images.posterSizes[size]}`

    return {
      featured: {
        title: featured.title,
        imgUrl: `${getImgBaseUrl(6)}${featured.backdropPath}`,
        overview: featured.overview,
      },
      upcoming: upcoming.map((movie) => ({
        imgUrl: `${getImgBaseUrl(3)}${movie.posterPath}`,
      })),
      popular: popular.map((movie) => ({
        imgUrl: `${getImgBaseUrl(3)}${movie.backdropPath}`,
      })),
    }
  }

  parseLiteflixMovie(movie: any): any {
    return {
      imgUrl: movie.imgUrl,
    }
  }
}
