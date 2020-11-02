import * as dotenv from 'dotenv'
import { toNumber } from 'lodash'

dotenv.config()

interface EnvironmentConfiguration {
  liteflixBaseUrl: string
  tmdbBaseUrl: string
  upcomingMoviesAmount: number
  popularMoviesAmount: number
  redisHost: string
  redisPass: string
  redisPort: number
  genresTtl: number
  tmdbConfigTtl: number
}

const {
  LITEFLIX_MOVIES_BASE_URL,
  TMDB_BASE_URL,
  POPULAR_MOVIES_AMOUNT,
  UPCOMING_MOVIES_AMOUNT,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  GENRES_TTL,
  TMDB_CONFIG_TTL,
} = process.env

const envConfig = (): EnvironmentConfiguration => ({
  liteflixBaseUrl: LITEFLIX_MOVIES_BASE_URL,
  tmdbBaseUrl: TMDB_BASE_URL,
  upcomingMoviesAmount: toNumber(UPCOMING_MOVIES_AMOUNT),
  popularMoviesAmount: toNumber(POPULAR_MOVIES_AMOUNT),
  redisHost: REDIS_HOST,
  redisPort: toNumber(REDIS_PORT),
  redisPass: REDIS_PASSWORD,
  genresTtl: toNumber(GENRES_TTL),
  tmdbConfigTtl: toNumber(TMDB_CONFIG_TTL),
})

export default envConfig
