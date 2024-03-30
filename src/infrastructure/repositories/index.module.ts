import { Module } from '@nestjs/common';
import { UserRepositoryImp } from './user.repository';
import { DatabaseModule } from '@infrastructure/config/prisma/prisma.module';
import { PostRepositoryImp } from './post.repository';

@Module({
  imports: [DatabaseModule],
  providers: [UserRepositoryImp, PostRepositoryImp],
  exports: [UserRepositoryImp, PostRepositoryImp],
})
export class RepositoriesModule {}
