import { HttpService, Injectable, Logger } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { Movie } from 'src/api/movie/dto/movie.dto'
import { GroupedByGenreMovies } from 'src/commons/interfaces'

@Injectable()
export class LiteflixService {
  constructor(private httpService: HttpService, private logger: Logger) {}

  createMovie(body: {
    title: string
    imgUrl: string
    tmdbGenreId: number
  }): Observable<Movie[]> {
    return this.httpService
      .post<Movie[]>('/movie', { body })
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

  getGroupedByGenreLiteflixMovies(): Observable<GroupedByGenreMovies[]> {
    return this.httpService
      .get<GroupedByGenreMovies[]>('/movie/grouped-by-genre')
      .pipe(
        map((response) => response.data),
        tap(() => this.logger.log('Movies were returned successfully')),
        catchError((err) => {
          this.logger.error(`There was an error getting returning movies`)

          return throwError(err)
        })
      )
  }
}
