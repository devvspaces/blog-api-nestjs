import { DynamicModule, Module } from '@nestjs/common';
import { LoginUseCases } from '../../usecases/auth/login.usecases';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { RepositoriesModule } from '../repositories/index.module';

import { UserRepositoryImp } from '../repositories/user.repository';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { UseCaseProxy } from './usecases-proxy';
import { ExceptionsService } from '@infrastructure/exceptions/exceptions.service';
import { PostRepositoryImp } from '@infrastructure/repositories/post.repository';
import { CreatePostUseCases } from '@usecases/posts/createPost.usecases';
import { BcryptModule } from '@infrastructure/services/bcrypt/bcrypt.module';
import { GetPostsUseCases } from '@usecases/posts/getPosts.usecases';
import { GetPostUseCases } from '@usecases/posts/getPost.usecases';
import { UpdatePostUseCases } from '@usecases/posts/updatePost.usecases';
import { DeletePostUseCases } from '@usecases/posts/deletePost.usecases';
import { BcryptService } from '@infrastructure/services/bcrypt/bcrypt.service';

@Module({
  imports: [
    LoggerModule,
    BcryptModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionsModule,
  ],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static CREATE_POST_USECASES_PROXY = 'CreatePostUseCasesProxy';
  static GET_POSTS_USECASES_PROXY = 'GetPostsUseCasesProxy';
  static GET_POST_USECASES_PROXY = 'GetPostUseCasesProxy';
  static UPDATE_POST_USECASES_PROXY = 'UpdatePostUseCasesProxy';
  static DELETE_POST_USECASES_PROXY = 'DeletePostUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [
            LoggerService,
            BcryptService,
            EnvironmentConfigService,
            UserRepositoryImp,
            ExceptionsService,
          ],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            bcryptService: BcryptService,
            config: EnvironmentConfigService,
            userRepo: UserRepositoryImp,
            exceptions: ExceptionsService,
          ) =>
            new UseCaseProxy(
              new LoginUseCases(logger, bcryptService, userRepo, exceptions),
            ),
        },
        {
          inject: [LoggerService, PostRepositoryImp, ExceptionsService],
          provide: UsecasesProxyModule.CREATE_POST_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            repo: PostRepositoryImp,
            exceptions: ExceptionsService,
          ) =>
            new UseCaseProxy(new CreatePostUseCases(logger, repo, exceptions)),
        },
        {
          inject: [LoggerService, PostRepositoryImp, ExceptionsService],
          provide: UsecasesProxyModule.GET_POSTS_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            repo: PostRepositoryImp,
            exceptions: ExceptionsService,
          ) => new UseCaseProxy(new GetPostsUseCases(logger, repo, exceptions)),
        },
        {
          inject: [LoggerService, PostRepositoryImp, ExceptionsService],
          provide: UsecasesProxyModule.GET_POST_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            repo: PostRepositoryImp,
            exceptions: ExceptionsService,
          ) => new UseCaseProxy(new GetPostUseCases(logger, repo, exceptions)),
        },
        {
          inject: [LoggerService, PostRepositoryImp, ExceptionsService],
          provide: UsecasesProxyModule.UPDATE_POST_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            repo: PostRepositoryImp,
            exceptions: ExceptionsService,
          ) =>
            new UseCaseProxy(new UpdatePostUseCases(logger, repo, exceptions)),
        },
        {
          inject: [LoggerService, PostRepositoryImp, ExceptionsService],
          provide: UsecasesProxyModule.DELETE_POST_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            repo: PostRepositoryImp,
            exceptions: ExceptionsService,
          ) =>
            new UseCaseProxy(new DeletePostUseCases(logger, repo, exceptions)),
        },
      ],
      exports: [
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.CREATE_POST_USECASES_PROXY,
        UsecasesProxyModule.GET_POSTS_USECASES_PROXY,
        UsecasesProxyModule.GET_POST_USECASES_PROXY,
        UsecasesProxyModule.UPDATE_POST_USECASES_PROXY,
        UsecasesProxyModule.DELETE_POST_USECASES_PROXY,
      ],
    };
  }
}
