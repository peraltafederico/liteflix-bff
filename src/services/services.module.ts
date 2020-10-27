import { Module } from '@nestjs/common'
import { LiteflixModule } from './liteflix/liteflix.module'

@Module({
  imports: [LiteflixModule],
  exports: [LiteflixModule],
})
export class ServicesModule {}
