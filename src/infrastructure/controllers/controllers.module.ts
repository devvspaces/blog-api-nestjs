import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { PostController } from './posts/posts.controller';
import { ExceptionsModule } from '@infrastructure/exceptions/exceptions.module';

@Module({
  imports: [UsecasesProxyModule.register(), ExceptionsModule],
  controllers: [AuthController, PostController],
})
export class ControllersModule {}
