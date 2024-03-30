import { ILogger } from '../../domain/logger/logger.interface';
import { IException } from '@domain/exceptions/exceptions.interface';
import {
  CreatePost,
  PostRepository,
} from '@domain/repositories/postRepository.interface';

export class UpdatePostUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: PostRepository,
    private readonly exception: IException,
  ) {
    this.logger.setContext(UpdatePostUseCases.name);
  }

  async updatePost(postId: string, data: Partial<CreatePost>) {
    return this.repo.updatePost(postId, data);
  }
}
