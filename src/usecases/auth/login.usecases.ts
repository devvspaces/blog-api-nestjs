import { ExceptionsService } from '@infrastructure/exceptions/exceptions.service';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { IBcryptService } from '@domain/adapters/bcrypt.interface';

export class LoginUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly bcryptService: IBcryptService,
    private readonly userRepository: UserRepository,
    private readonly exception: ExceptionsService,
  ) {
    this.logger.setContext(LoginUseCases.name);
  }

  async register(username: string, password: string) {
    if (await this.userRepository.getUserByUsername(username)) {
      this.exception.badRequestException({
        message: 'User already exists',
      });
    }

    const user = await this.userRepository.createUser({
      username,
      password: await this.bcryptService.hash(password),
    });

    return user;
  }

  async authenticate(username: string, password: string) {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      this.exception.badRequestException({
        message: 'User not found',
      });
    }

    const isValid = await this.bcryptService.compare(password, user.password);
    if (!isValid) {
      this.exception.badRequestException({
        message: 'Invalid password',
      });
    }

    return user;
  }

  async getUser(id: string) {
    const exists = await this.userRepository.getUser(id);
    if (!exists) {
      this.exception.unauthorizedException({
        message: 'You are not authorized access this resource',
      });
    }
    return exists;
  }
}
