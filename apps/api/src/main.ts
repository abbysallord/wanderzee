import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());

  app.enableCors({
    origin: [
      'http://localhost:8080',
      'http://localhost:3000',
      'https://wanderzee.in',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('WanderZee API')
    .setDescription('AI-Powered Travel Companion for Karnataka')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication & Authorization')
    .addTag('users', 'User Management')
    .addTag('trips', 'Trip Planning & Management')
    .addTag('places', 'Places & Points of Interest')
    .addTag('ai', 'AI Trip Generation')
    .addTag('safety', 'Safety Advisories')
    .addTag('budget', 'Budget & Expenses')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`
  🌍 WanderZee API is running!
  📍 Server:  http://localhost:${port}
  📚 Swagger: http://localhost:${port}/api/docs
  🏥 Health:  http://localhost:${port}/api/v1/health
  `);
}

bootstrap();
