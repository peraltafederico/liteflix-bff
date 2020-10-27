import { Body, Controller, Get, Post } from '@nestjs/common'
import { Observable } from 'rxjs'
import { LiteflixMovie, TmdbMovies } from '../../commons/interfaces'
import { MovieService } from './movie.service'

@Controller('/movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('/liteflix')
  createLiteflixMovie(
    @Body() body: { title: string; imgUrl: string; tmdbGenreId: number }
  ): Observable<LiteflixMovie[]> {
    return this.movieService.createLiteflixMovie(body)
  }

  @Get('/liteflix')
  getLiteflixMovies(): Observable<LiteflixMovie[]> {
    return this.movieService.getLiteflixMovies()
  }

  @Get('/tmdb')
  getTmdbMovies(): Observable<Promise<TmdbMovies>> {
    return this.movieService.getTmdbMovies()
  }
}
