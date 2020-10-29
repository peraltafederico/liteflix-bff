import { Injectable } from '@nestjs/common'
import { GroupedByGenreMovies, TmdbMovie } from 'src/commons/interfaces'
import { CacheHelper } from 'src/commons/helpers/cache.helper'
import { GetMainMoviesResponse } from '../dto/get-main-movies-response.dto'
import { ParsedGroupedByGenreMovies } from '../dto/parsed-grouped-by-genre-movies'

@Injectable()
export class MovieHelper {
  constructor(private readonly cacheHelper: CacheHelper) {}

  async parseMainMovies({
    featured,
    upcoming,
    popular,
  }: {
    featured: TmdbMovie
    upcoming: TmdbMovie[]
    popular: TmdbMovie[]
  }): Promise<GetMainMoviesResponse> {
    const { images } = await this.cacheHelper.getTmdbConfig()

    const getImgBaseUrl = (size: number): string =>
      `${images.secureBaseUrl}${images.posterSizes[size]}`

    return {
      featured: {
        title: featured.title,
        imgUrl: `${getImgBaseUrl(6)}${featured.backdropPath}`,
        overview: featured.overview,
      },
      upcoming: upcoming.map((movie) => ({
        imgUrl: `${getImgBaseUrl(5)}${movie.backdropPath}`,
      })),
      popular: popular.map((movie) => ({
        imgUrl: `${getImgBaseUrl(3)}${movie.posterPath}`,
      })),
    }
  }

  async parseGroupedByGenreMovies(
    groupedByGenreMovies: GroupedByGenreMovies[]
  ): Promise<ParsedGroupedByGenreMovies[]> {
    const genres = await this.cacheHelper.getGenres()

    // TODO: Validate genre before create movie

    return groupedByGenreMovies
      .map((group) => {
        const { name: genre } = genres.find(
          (i) => i.id === group.tmdbGenreId
        ) || { name: 'UNKNOWN' }

        return {
          genre,
          movies: group.movies.map((movie) => ({
            imgUrl: movie.imgUrl,
          })),
        }
      })
      .sort((a, b) => a.genre.localeCompare(b.genre))
  }
}
