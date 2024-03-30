import { Injectable } from '@nestjs/common';
import { UserM } from '../../domain/model/user';
import {
  CreateUser,
  UserRepository,
} from '../../domain/repositories/userRepository.interface';
import { PrismaService } from '@infrastructure/config/prisma/prisma.service';

@Injectable()
export class UserRepositoryImp implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getUser(id: string): Promise<UserM> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    return user;
  }

  async getUserByUsername(username: string): Promise<UserM> {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });
    return user;
  }

  async createUser(data: CreateUser): Promise<UserM> {
    const user = await this.prismaService.user.create({
      data: {
        ...data,
      },
    });
    return user;
  }
}
