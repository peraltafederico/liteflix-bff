import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger'
import { Observable } from 'rxjs'
import { CreateMovieRequest } from './dto/create-movie-request.dto'
import { Genre } from './dto/genre.dto'
import { GetMainMoviesResponse } from './dto/get-main-movies-response.dto'
import { Movie } from './dto/movie.dto'
import { ParsedGroupedByGenreMovies } from './dto/parsed-grouped-by-genre-movies.dto'
import { MovieService } from './movie.service'

@Controller('/movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('/')
  @ApiCreatedResponse({
    description: 'Movie created successfully',
    type: Movie,
  })
  createMovie(@Body() body: CreateMovieRequest): Promise<Observable<Movie[]>> {
    return this.movieService.createMovie(body)
  }

  @Get('/main')
  @ApiOkResponse({
    description: 'Main movies returned successfully',
    type: GetMainMoviesResponse,
  })
  getMainMovies(): Observable<Promise<GetMainMoviesResponse>> {
    return this.movieService.getMainMovies()
  }

  @Get('/grouped-by-genre')
  @ApiOkResponse({
    description: 'Movies grouped by genred returned successfully',
    type: [ParsedGroupedByGenreMovies],
  })
  getGroupedByGenreMovies(): Observable<Promise<ParsedGroupedByGenreMovies[]>> {
    return this.movieService.getGroupedByGenreMovies()
  }

  @Get('/genres')
  @ApiOkResponse({
    description: 'Genres returned successfully',
    type: [Genre],
  })
  getMovieGenres(): Promise<Genre[]> {
    return this.movieService.getMovieGenres()
  }
}
