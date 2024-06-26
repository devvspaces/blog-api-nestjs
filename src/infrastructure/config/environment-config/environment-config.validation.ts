import { Environment } from '@domain/config/enviroment.interface';
import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;
  @IsString()
  APP_NAME: string;
  @IsString()
  DEFAULT_ADMIN_USERNAME: string;
  @IsString()
  DEFAULT_ADMIN_PASSWORD: string;
  @IsString()
  @IsOptional()
  SWAGGER_ROUTE: string;
  @IsNumber()
  PORT: number;

  @IsString()
  API_KEY: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
