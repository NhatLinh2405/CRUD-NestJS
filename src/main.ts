import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module';

function globalMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log('this is globle middleware');
  next();
}

const PORT = +process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Messenger API')
    .setDescription('The Messenger API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access_token',
    )
    .build();

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  // app.useGlobalGuards(new BookGuard());
  // app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(globalMiddleware);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(8080);

  console.log(`[⚡server] Server is running on port http://localhost:${PORT}`);
  console.log(`[⚡server] Swagger on http://localhost:${PORT}/api`);
}
bootstrap();
