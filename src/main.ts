import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rTracer = require('cls-rtracer');
import { ConfigService } from '@nestjs/config';
import { ExceptionManager } from './commons/utils/exceptions-manager.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const info = require('../package.json');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  //Configuración librería para validación de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      skipNullProperties: true,
    }),
  );

  app.enableVersioning();

  //Configuración libreria para generación de indentificador de solicitud
  app.use(rTracer.expressMiddleware());
  //Se carga configuración
  const configService = app.get(ConfigService);

  //Configuración de filter para el manejo de excepciones
  app.useGlobalFilters(new ExceptionManager());

  //Swagger
  const swaggerconfig = new DocumentBuilder()
    .setTitle(info.name)
    .setDescription(info.description)
    .setVersion(info.version)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerconfig);
  SwaggerModule.setup(`/api-doc`, app, document);

  const PORT = configService.get<number>('PORT');
  await app.listen(PORT, async () =>
    console.log(`Application is running on: ${await app.getUrl()}`),
  );
}
bootstrap();
