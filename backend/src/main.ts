import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { apiReference } from '@scalar/express-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Centro de Salud Amatitlán - API')
    .setDescription('API REST para pacientes, médicos y citas')
    .setVersion('1.0.0')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

  const express = app.getHttpAdapter().getInstance();
  express.get('/openapi.json', (_req: any, res: any) => res.json(document));

  app.use(
    '/docs',
    apiReference({
      theme: 'alternate',
      spec: { url: '/openapi.json' },
    } as any),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
