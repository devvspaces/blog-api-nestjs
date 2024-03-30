import { CreatePost } from '@domain/repositories/postRepository.interface';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto implements Omit<CreatePost, 'userId'> {
  @ApiProperty({
    description: 'The title of the post',
    example: 'My first post',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The content of the post',
    example: 'This is the content of my first post',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'Boolean to check if the post is published',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  published: boolean;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
