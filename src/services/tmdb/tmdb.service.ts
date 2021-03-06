import { HttpService, Injectable, Logger } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { Genre } from '../../api/movie/dto/genre.dto'
import { TmdbConfig, TmdbResponse } from '../../commons/interfaces'

@Injectable()
export class TmbdService {
  constructor(private httpService: HttpService, private logger: Logger) {}

  getNowPlayingMovies(params?: { page: string }): Observable<TmdbResponse> {
    return this.httpService
      .get<TmdbResponse>('/movie/now-playing', { params })
      .pipe(
        map((response) => response.data),
        tap(() => this.logger.log('Now playing movies returned successfully')),
        catchError((err) => {
          this.logger.error('There was an error getting now playing movies')

          return throwError(err)
        })
      )
  }

  getUpcomingMovies(params?: { page: string }): Observable<TmdbResponse> {
    return this.httpService
      .get<TmdbResponse>('/movie/upcoming', { params })
      .pipe(
        map((response) => response.data),
        tap(() => this.logger.log('Upcoming movies returned successfully')),
        catchError((err) => {
          this.logger.error('There was an error getting upcoming movies')

          return throwError(err)
        })
      )
  }

  getPopularMovies(params?: { page: string }): Observable<TmdbResponse> {
    return this.httpService
      .get<TmdbResponse>('/movie/popular', { params })
      .pipe(
        map((response) => response.data),
        tap(() => this.logger.log('Popular movies returned successfully')),
        catchError((err) => {
          this.logger.error('There was an error getting popular movies')

          return throwError(err)
        })
      )
  }

  getConfig(): Observable<TmdbConfig> {
    return this.httpService.get<TmdbConfig>('/config').pipe(
      map((response) => response.data),
      tap(() => this.logger.log('Configuration returned successfully')),
      catchError((err) => {
        this.logger.error(`There was an error getting configuration`)

        return throwError(err)
      })
    )
  }

  getGenres(): Observable<Genre[]> {
    return this.httpService.get<Genre[]>('/genre').pipe(
      map((response) => response.data),
      tap(() => this.logger.log('Genres returned successfully')),
      catchError((err) => {
        this.logger.error('There was an error getting genres')

        return throwError(err)
      })
    )
  }
}
