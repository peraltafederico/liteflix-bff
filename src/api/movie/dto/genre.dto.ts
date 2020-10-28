import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class Genre {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly id: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string
}
