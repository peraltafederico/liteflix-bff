import { HttpModule, Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TmbdService } from './tmdb.service'

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('tmdbBaseUrl'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [TmbdService, Logger],
  exports: [TmbdService],
})
export class TmdbModule {}
