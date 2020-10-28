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
export interface TmdbConfig {
  images: {
    baseUrl: string
    secureBaseUrl: string
    backdropSizes: string[]
    logoSizes: string[]
    posterSizes: string[]
    profileSizes: string[]
    stillSizes: string[]
  }
  changeKeys: string[]
}

export interface TmdbGenre {
  id: number
  name: string
}

export interface GroupedByGenreMovies {
  tmdbGenreId: number
  movies: {
    _id: string
    tmdbGenreId: number
    imgUrl: string
    title: string
  }[]
}
