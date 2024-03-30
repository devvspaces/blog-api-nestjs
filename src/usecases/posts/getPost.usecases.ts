import { PostRepository } from '@domain/repositories/postRepository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IException } from '@domain/exceptions/exceptions.interface';

export class GetPostUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: PostRepository,
    private readonly exception: IException,
  ) {
    this.logger.setContext(GetPostUseCases.name);
  }

  async getPost(postId: string) {
    return this.repo.getPost(postId);
  }
}
