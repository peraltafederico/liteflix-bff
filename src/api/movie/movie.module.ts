import { Module } from '@nestjs/common'
import { ServicesModule } from '../../services/services.module'
import { MovieController } from './movie.controller'
import { MovieService } from './movie.service'

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  imports: [ServicesModule],
})
export class MovieModule {}
