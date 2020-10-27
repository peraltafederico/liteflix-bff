import { HttpModule, Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('tmdbBaseUrl'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [Logger],
})
export class LiteflixModule {}
