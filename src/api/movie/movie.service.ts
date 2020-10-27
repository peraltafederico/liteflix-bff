import { Injectable } from '@nestjs/common'
import { forkJoin, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { LiteflixMovie, TmdbMovies } from '../../commons/interfaces'
import { TmbdService } from '../../services/tmdb/tmdb.service'
import { LiteflixService } from '../../services/liteflix/liteflix.service'

@Injectable()
export class MovieService {
  constructor(
    private readonly liteflixService: LiteflixService,
    private readonly tmdbService: TmbdService
  ) {}

  createLiteflixMovie(body: {
    title: string
    imgUrl: string
    tmdbGenreId: number
  }): Observable<LiteflixMovie[]> {
    return this.liteflixService.createMovie(body)
  }

  getLiteflixMovies(): Observable<LiteflixMovie[]> {
    return this.liteflixService.getLiteflixMovies()
  }

  getTmdbMovies(): Observable<TmdbMovies> {
    return forkJoin([
      this.tmdbService.getNowPlayingMovies(),
      this.tmdbService.getUpcomingMovies(),
      this.tmdbService.getPopularMovies(),
    ]).pipe(
      map(([nowPlayingResponse, upcomingResponse, popularResponse]) => {
        const [featured] = nowPlayingResponse.results.sort(
          (a, b) =>
            new Date(b.releaseDate).getTime() -
            new Date(a.releaseDate).getTime()
        )

        return {
          featured,
          upcoming: upcomingResponse.results.slice(0, 4),
          popular: popularResponse.results.slice(0, 4),
        }
      })
    )
  }
}
