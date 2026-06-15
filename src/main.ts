import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Versionnement par URI : /v1/agrements
  app.enableVersioning({ type: VersioningType.URI });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      // Préserve la distinction « champ absent » / « champ à null » : un champ
      // absent n'est pas matérialisé sur le DTO, un champ à null l'est.
      transformOptions: { exposeUnsetFields: false },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
