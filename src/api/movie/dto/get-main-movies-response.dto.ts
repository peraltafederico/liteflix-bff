import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsObject, IsString, IsArray } from 'class-validator'

class Featured {
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

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly overview: string
}

class UpcomingMovie {
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

class PopularMovie {
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

export class GetMainMoviesResponse {
  @ApiProperty({ type: Featured })
  @IsObject()
  @IsNotEmpty()
  readonly featured: Featured

  @ApiProperty({ isArray: true, type: UpcomingMovie })
  @IsArray()
  @IsNotEmpty()
  readonly upcoming: UpcomingMovie[]

  @ApiProperty({ isArray: true, type: PopularMovie })
  @IsArray()
  @IsNotEmpty()
  readonly popular: PopularMovie[]
}
