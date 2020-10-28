import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class Movie {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly _id: string

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
