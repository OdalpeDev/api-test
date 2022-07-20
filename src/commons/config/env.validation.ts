import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsString, MinLength, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  @MinLength(12)
  KEY_PASSWORD_ENCRIPTION: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const variables = errors.map((error) => error.property);
    Logger.error('Configuration error.', variables);

    throw new Error(
      'You do not have the necessary configuration to run the microservice.',
    );
  }

  return validatedConfig;
}
