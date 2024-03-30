import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({
    description: 'The number of items to skip',
    example: 3,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  skip?: number;

  @ApiProperty({
    description: 'The number of items to take',
    example: 10,
    required: false,
    default: 10,
  })
  @IsNumber()
  @IsOptional()
  take?: number;
}
