import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthDto } from './auth-dto.class';

import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { ApiHeaders } from '@infrastructure/common/decorators/api.decorator';
import { MessagePresenter } from '@infrastructure/common/presenters/message.presenter';

@Controller('auth')
@ApiTags('Authentication')
@UseInterceptors(ClassSerializerInterceptor)
@ApiHeaders()
export class AuthController {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
  ) {}

  @Post('register')
  @ApiBody({ type: AuthDto })
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Use this route to register a new user',
  })
  @ApiOkResponse({
    description: 'The user was created successfully',
    type: MessagePresenter,
  })
  @HttpCode(200)
  async register(@Body() auth: AuthDto) {
    await this.loginUsecaseProxy
      .getInstance()
      .register(auth.username, auth.password);
    return new MessagePresenter({
      message: 'User created successfully',
    });
  }
}
