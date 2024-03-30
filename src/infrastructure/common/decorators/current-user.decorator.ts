import { UserM } from '@domain/model/user';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUserAccount = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as unknown as Request;
    const payload = request['user'] as UserM;
    return payload;
  },
);
