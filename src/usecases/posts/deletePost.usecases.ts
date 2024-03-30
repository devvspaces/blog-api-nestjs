import { PostRepository } from '@domain/repositories/postRepository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IException } from '@domain/exceptions/exceptions.interface';

export class DeletePostUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: PostRepository,
    private readonly exception: IException,
  ) {
    this.logger.setContext(DeletePostUseCases.name);
  }

  async deletePost(postId: string, userId: string) {
    return this.repo.deletePost(postId, userId);
  }
}
