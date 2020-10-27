import { Injectable, Logger } from '@nestjs/common'
import { forkJoin, Observable, throwError } from 'rxjs'
import { map, tap, catchError } from 'rxjs/operators'
import { ConfigService } from '@nestjs/config'
import { LiteflixMovie, TmdbMovies } from '../../commons/interfaces'
import { TmbdService } from '../../services/tmdb/tmdb.service'
import { LiteflixService } from '../../services/liteflix/liteflix.service'
import { MovieHelper } from './helpers/movie.helper'

@Injectable()
export class MovieService {
  constructor(
    private readonly liteflixService: LiteflixService,
    private readonly tmdbService: TmbdService,
    private readonly movieHelper: MovieHelper,
    private logger: Logger,
    private configService: ConfigService
  ) {}

  createLiteflixMovie(body: {
    title: string
    imgUrl: string
    tmdbGenreId: number
  }): Observable<LiteflixMovie[]> {
    return this.liteflixService.createMovie(body)
  }

  getLiteflixMovies(): Observable<LiteflixMovie[]> {
    return this.liteflixService
      .getLiteflixMovies()
      .pipe(
        map((response) =>
          response.map((movie) => this.movieHelper.parseLiteflixMovie(movie))
        )
      )
  }

  getTmdbMovies(): Observable<Promise<TmdbMovies>> {
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
