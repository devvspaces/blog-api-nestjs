import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/config/prisma/prisma.service';
import {
  CreatePost,
  PostRepository,
} from '@domain/repositories/postRepository.interface';
import { PostM } from '@domain/model/post';

@Injectable()
export class PostRepositoryImp implements PostRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async all(): Promise<PostM[]> {
    return this.prismaService.post.findMany();
  }

  async getPosts(userId: string): Promise<PostM[]> {
    return this.prismaService.post.findMany({
      where: {
        userId,
      },
    });
  }

  async getPost(id: string): Promise<PostM> {
    return this.prismaService.post.findUnique({
      where: {
        id,
      },
    });
  }

  async createPost(data: CreatePost): Promise<PostM> {
    return this.prismaService.post.create({
      data: {
        title: data.title,
        content: data.content,
        published: data.published,
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });
  }

  async updatePost(id: string, data: Partial<CreatePost>): Promise<PostM> {
    return this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        content: data.content,
        published: data.published,
      },
    });
  }

  async deletePost(id: string): Promise<void> {
    await this.prismaService.post.delete({
      where: {
        id,
      },
    });
  }
}
