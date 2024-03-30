import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotAcceptableException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  IException,
  IFormatExceptionMessage,
} from '../../domain/exceptions/exceptions.interface';

@Injectable()
export class ExceptionsService implements IException {
  private readonly logger = new Logger(ExceptionsService.name);
  defaultNotFoundMessage = 'Resource not found';

  badRequestException(data: IFormatExceptionMessage): void {
    throw new BadRequestException(data);
  }
  internalServerErrorException(data?: IFormatExceptionMessage): void {
    throw new InternalServerErrorException(data);
  }
  forbiddenException(
    data: IFormatExceptionMessage = { message: 'Forbidden' },
  ): void {
    throw new ForbiddenException(data);
  }
  unauthorizedException(data?: IFormatExceptionMessage): void {
    throw new UnauthorizedException(data);
  }
  notFoundException(
    data: IFormatExceptionMessage = { message: this.defaultNotFoundMessage },
  ): void {
    throw new BadRequestException(data);
  }
  throwConflictRecord(
    data: IFormatExceptionMessage = { message: 'Conflict record' },
  ) {
    throw new ConflictException(data);
  }
  throwNotAcceptable(
    data: IFormatExceptionMessage = { message: 'Not acceptable input' },
  ) {
    throw new NotAcceptableException(data);
  }
  throwUnprocessableInput(
    data: IFormatExceptionMessage = { message: 'Unprocessable input' },
  ) {
    throw new UnprocessableEntityException(data);
  }
}
