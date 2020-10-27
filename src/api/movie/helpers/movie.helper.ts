export class MovieHelper {
  static parseFeaturedMovie(movie: any): any {
    return {
      title: movie.title,
      imgUrl: movie.posterPath,
      overview: movie.overview,
    }
  }

  static parseTmdbMovie(movie: any): any {
    return {
      imgUrl: movie.posterPath,
    }
  }

  static parseLiteflixMovie(movie: any): any {
    return {
      imgUrl: movie.imgUrl,
    }
  }
}
