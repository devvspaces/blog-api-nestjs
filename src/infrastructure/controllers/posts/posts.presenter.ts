import { PostM } from '@domain/model/post';
import { ApiResponseProperty } from '@nestjs/swagger';

export class PostPresenter implements PostM {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  title: string;

  @ApiResponseProperty()
  content: string;

  @ApiResponseProperty()
  published: boolean;

  @ApiResponseProperty()
  createdAt: Date;

  @ApiResponseProperty()
  updatedAt: Date;

  @ApiResponseProperty()
  userId: string;

  constructor(data: Partial<PostPresenter>) {
    Object.assign(this, data);
  }
}
