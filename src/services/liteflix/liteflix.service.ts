import { HttpService, Injectable, Logger } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { LiteflixMovie } from '../../commons/interfaces'

@Injectable()
export class LiteflixService {
  constructor(private httpService: HttpService, private logger: Logger) {}

  createMovie(body: {
    title: string
    imgUrl: string
    tmdbGenreId: number
  }): Observable<LiteflixMovie[]> {
    return this.httpService
      .post<LiteflixMovie[]>('/movie', { body })
      .pipe(
        map((response) => response.data),
        tap(() =>
          this.logger.log(`Movie with title ${body.title} created successfully`)
        ),
        catchError((err) => {
          this.logger.error(
            `There was an error creating movie with title ${body.title}`
          )

          return throwError(err)
        })
      )
  }

  getLiteflixMovies(): Observable<LiteflixMovie[]> {
    return this.httpService.get<LiteflixMovie[]>('/movie').pipe(
      map((response) => response.data),
      tap(() => this.logger.log('Movies were returned successfully')),
      catchError((err) => {
        this.logger.error(`There was an error getting returning movies`)

        return throwError(err)
      })
    )
  }
}
