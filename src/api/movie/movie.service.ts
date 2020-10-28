import { Injectable, Logger } from '@nestjs/common'
import { forkJoin, Observable, throwError } from 'rxjs'
import { map, tap, catchError } from 'rxjs/operators'
import { ConfigService } from '@nestjs/config'
import { TmbdService } from '../../services/tmdb/tmdb.service'
import { LiteflixService } from '../../services/liteflix/liteflix.service'
import { MovieHelper } from './helpers/movie.helper'
import { GetMainMoviesResponse } from './dto/get-main-movies-response.dto'
import { Movie } from './dto/movie.dto'
import { ParsedGroupedByGenreMovies } from './dto/parsed-grouped-by-genre-movies'


@Injectable()
export class MovieService {
  constructor(
    private readonly liteflixService: LiteflixService,
    private readonly tmdbService: TmbdService,
    private readonly movieHelper: MovieHelper,
    private logger: Logger,
    private configService: ConfigService
  ) { }

  createLiteflixMovie(body: {
    title: string
    imgUrl: string
    tmdbGenreId: number
  }): Observable<Movie[]> {
    return this.liteflixService.createMovie(body)
  }

  getLiteflixMovies(): Observable<Promise<ParsedGroupedByGenreMovies[]>> {
    return this.liteflixService
      .getGroupedByGenreLiteflixMovies()
      .pipe(
        map(async (response) => this.movieHelper.parseLiteflixMovies(response))
      )
  }

  getTmdbMovies(): Observable<Promise<GetMainMoviesResponse>> {
    return forkJoin([
      this.tmdbService.getNowPlayingMovies(),
      this.tmdbService.getUpcomingMovies(),
      this.tmdbService.getPopularMovies(),
    ]).pipe(
      map(async ([nowPlayingResponse, upcomingResponse, popularResponse]) => {
        const [featured] = nowPlayingResponse.results.sort(
          (a, b) =>
            new Date(b.releaseDate).getTime() -
            new Date(a.releaseDate).getTime()
        )

        const upcoming = upcomingResponse.results.slice(
          0,
          this.configService.get('upcomingMoviesAmount')
        )

        const popular = popularResponse.results.slice(
          0,
          this.configService.get('popularMoviesAmount')
        )

        return this.movieHelper.parseTmdbMovies({ featured, upcoming, popular })
      }),
      tap(() => this.logger.log('Tmdb movies parsed successfully')),
      catchError((err) => {
        this.logger.error('There was an error parsing tmdb movies')

        return throwError(err)
      })
    )
  }
}
