import { UserM } from '@domain/model/user';

export interface CreateUser {
  username: string;
  password: string;
}

export interface UserRepository {
  getUser(id: string): Promise<UserM>;
  getUserByUsername(username: string): Promise<UserM>;
  createUser(data: CreateUser): Promise<UserM>;
}
