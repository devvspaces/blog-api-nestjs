import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Environment,
  EnvironmentConfig,
} from '@domain/config/enviroment.interface';

@Injectable()
export class EnvironmentConfigService implements EnvironmentConfig {
  constructor(private configService: ConfigService) {}

  getEnvironment(): Environment {
    return this.configService.get<Environment>('NODE_ENV');
  }

  getApiKey(): string {
    return this.configService.get<string>('API_KEY');
  }

  getAppName(): string {
    return this.configService.get<string>('APP_NAME');
  }

  getPort(): number {
    return this.configService.get<number>('PORT');
  }

  getDefaultAdmin() {
    return {
      username: this.configService.get<string>('DEFAULT_ADMIN_USERNAME'),
      password: this.configService.get<string>('DEFAULT_ADMIN_PASSWORD'),
    };
  }

  getSwaggerRoute(): string {
    return this.configService.get<string>('SWAGGER_ROUTE');
  }
}
