import { ILogger } from '../../domain/logger/logger.interface';
import { IException } from '@domain/exceptions/exceptions.interface';
import { PostRepository } from '@domain/repositories/postRepository.interface';

export class GetPostsUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repository: PostRepository,
    private readonly exception: IException,
  ) {
    this.logger.setContext(GetPostsUseCases.name);
  }

  async getPosts() {
    return this.repository.all();
  }

  async getUserPosts(userId: string) {
    return this.repository.getPosts(userId);
  }
}
