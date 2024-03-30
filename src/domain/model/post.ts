import { UserM } from './user';

export class PostM {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: Partial<UserM>;
  title: string;
  content: string;
  published: boolean;
}
