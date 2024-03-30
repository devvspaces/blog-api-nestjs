import { PostM } from '@domain/model/post';

export type CreatePost = Pick<
  PostM,
  'title' | 'content' | 'published' | 'userId'
>;

export interface PostRepository {
  all(): Promise<PostM[]>;
  getPosts(userId: string): Promise<PostM[]>;
  getPost(id: string): Promise<PostM>;
  createPost(data: CreatePost): Promise<PostM>;
  updatePost(id: string, data: Partial<CreatePost>): Promise<PostM>;
  deletePost(id: string, userId: string): Promise<void>;
}
