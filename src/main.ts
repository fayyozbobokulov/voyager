import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { SentryInterceptor } from '../../../voyager/voyager/src/global/interceptors/sentry.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const sentryInterceptor = app.get(SentryInterceptor);
  const logger = new Logger(bootstrap.name);

  const options = {
    credentials: true,
  };
  app.enableCors(options);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        stopAtFirstError: true,
        enableDebugMessages: true,
      }),
  );

  app.useGlobalInterceptors(sentryInterceptor);

  const config = new DocumentBuilder()
      .setTitle('Voyager')
      .setDescription('Voyager')
      .setVersion('1.0')
      .addTag('REST API')
      .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'My API Docs',
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, customOptions);

  const port = configService.get('PORT');
  await app.listen(port, () => {
    logger.log(`Server running on http://localhost:${port}`);
  });
}
bootstrap();
