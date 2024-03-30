import { AuthenticationMiddleware } from '@infrastructure/middlewares/authentication.middleware';
import { EnvironmentConfigModule } from '@infrastructure/config/environment-config/environment-config.module';
import { ControllersModule } from '@infrastructure/controllers/controllers.module';
import { ExceptionsModule } from '@infrastructure/exceptions/exceptions.module';
import { LoggerModule } from '@infrastructure/logger/logger.module';
import { UsecasesProxyModule } from '@infrastructure/usecases-proxy/usecases-proxy.module';
import {
  Module,
  MiddlewareConsumer,
  ValidationPipe,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ApiKeyValidateModule } from '@infrastructure/services/api-validate/api-validate.module';
import { ApiMiddleware } from '@infrastructure/middlewares/apikey.middleware';
import { AllExceptionFilter } from '@infrastructure/common/filter/exception.filter';
import { BcryptModule } from '@infrastructure/services/bcrypt/bcrypt.module';

@Module({
  imports: [
    LoggerModule,
    ExceptionsModule,
    UsecasesProxyModule.register(),
    ControllersModule,
    BcryptModule,
    EnvironmentConfigModule,
    ApiKeyValidateModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        errorHttpStatusCode: 400,
        stopAtFirstError: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .exclude({
        path: 'auth/register',
        method: RequestMethod.POST,
      })
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });

    consumer.apply(ApiMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
