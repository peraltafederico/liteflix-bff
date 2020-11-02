import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsString } from 'class-validator'

class ParsedMovie {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly genre: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly imgUrl: string
}

export class ParsedGroupedByGenreMovies {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly genre: string

  @ApiProperty({ isArray: true, type: ParsedMovie })
  @IsArray()
  @IsNotEmpty()
  readonly movies: ParsedMovie[]
}
