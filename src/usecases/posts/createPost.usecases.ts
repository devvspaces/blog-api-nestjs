import { ILogger } from '../../domain/logger/logger.interface';
import {
  CreatePost,
  PostRepository,
} from '@domain/repositories/postRepository.interface';
import { IException } from '@domain/exceptions/exceptions.interface';

export class CreatePostUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly repo: PostRepository,
    private readonly exception: IException,
  ) {
    this.logger.setContext(CreatePostUseCases.name);
  }

  async create(data: CreatePost) {
    return this.repo.createPost(data);
  }
}
