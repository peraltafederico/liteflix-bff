export interface LiteflixMovie {
  _id: string
  tmdbGenreId: number
  title: string
  imgUrl: string
}

export interface TmdbMovie {
  popularity: number
  voteCount: number
  video: boolean
  posterPath: string
  id: number
  adult: boolean
  backdropPath: string
  originalLanguage: string
  originalTitle: string
  genreIds: number[]
  title: string
  voteAverage: number
  overview: string
  releaseDate: string
}

export interface TmdbResponse {
  results: TmdbMovie[]
  page: number
  totalResults: number
  dates: {
    maximum: string
    minimum: string
  }
  totalPages: number
}

export interface TmdbMovies {
  featured: TmdbMovie
  upcoming: TmdbMovie[]
  popular: TmdbMovie[]
}
