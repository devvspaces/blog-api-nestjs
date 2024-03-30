import { ExceptionsService } from '@infrastructure/exceptions/exceptions.service';
import { LoggerService } from '@infrastructure/logger/logger.service';
import { UseCaseProxy } from '@infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '@infrastructure/usecases-proxy/usecases-proxy.module';
import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { LoginUseCases } from '@usecases/auth/login.usecases';
import { Request, Response, NextFunction } from 'express';

/**
 * This middleware checks if the user is authenticated with a valid token.
 */
@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private logger = new LoggerService(AuthenticationMiddleware.name);

  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    private readonly exceptions: ExceptionsService,
  ) {}

  public async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      this.exceptions.unauthorizedException({
        message: 'Invalid or missing authentication credentials.',
      });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'ascii',
    );
    const [username, password] = credentials.split(':');

    try {
      const payload = await this.loginUsecaseProxy
        .getInstance()
        .authenticate(username, password);
      (req as any).user = payload;
      return next();
    } catch (error) {
      this.logger.error(error);
      const message = error.message || 'Unauthorized';
      const status = error.status || 401;
      this.exceptions.unauthorizedException({
        message,
        code_error: status,
      });
    }
  }
}
