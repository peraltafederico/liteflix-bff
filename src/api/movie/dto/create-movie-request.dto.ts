import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateMovieRequest {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly tmdbGenreId: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly imgUrl: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string
}
