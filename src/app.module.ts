import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MovieModule } from './api/movie/movie.module'
import envConfig from './config/environment.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      isGlobal: true,
    }),
    MovieModule,
  ],
})
export class AppModule {}
