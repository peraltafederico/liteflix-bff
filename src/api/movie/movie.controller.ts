import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger'
import { Observable } from 'rxjs'
import { GetMainMoviesResponse } from './dto/get-main-movies-response.dto'
import { Movie } from './dto/movie.dto'
import { ParsedGroupedByGenreMovies } from './dto/parsed-grouped-by-genre-movies'
import { MovieService } from './movie.service'

@Controller('/movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('/liteflix')
  @ApiCreatedResponse({
    description: 'Movie created successfully',
    type: [Movie],
  })
  createLiteflixMovie(
    @Body() body: { title: string; imgUrl: string; tmdbGenreId: number }
  ): Observable<Movie[]> {
    return this.movieService.createLiteflixMovie(body)
  }

  @Get('/main')
  @ApiOkResponse({
    description: 'Main movies returned successfully',
    type: GetMainMoviesResponse,
  })
  getTmdbMovies(): Observable<Promise<GetMainMoviesResponse>> {
    return this.movieService.getTmdbMovies()
  }

  @Get('/genre')
  @ApiOkResponse({
    description: 'Movies grouped by genred returned successfully',
    type: [ParsedGroupedByGenreMovies],
  })
  getLiteflixMovies(): Observable<Promise<ParsedGroupedByGenreMovies[]>> {
    return this.movieService.getLiteflixMovies()
  }
}
