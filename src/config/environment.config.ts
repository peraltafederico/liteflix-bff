import * as dotenv from 'dotenv'
import { toNumber } from 'lodash'

dotenv.config()

interface EnvironmentConfiguration {
  liteflixBaseUrl: string
  tmdbBaseUrl: string
  upcomingMoviesAmount: number
  popularMoviesAmount: number
}

const {
  LITEFLIX_MOVIES_BASE_URL,
  TMDB_BASE_URL,
  POPULAR_MOVIES_AMOUNT,
  UPCOMING_MOVIES_AMOUNT,
} = process.env

const envConfig = (): EnvironmentConfiguration => ({
  liteflixBaseUrl: LITEFLIX_MOVIES_BASE_URL,
  tmdbBaseUrl: TMDB_BASE_URL,
  upcomingMoviesAmount: toNumber(UPCOMING_MOVIES_AMOUNT),
  popularMoviesAmount: toNumber(POPULAR_MOVIES_AMOUNT),
})

export default envConfig
