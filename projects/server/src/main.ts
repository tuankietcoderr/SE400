import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters';
import { ResponseInterceptor } from './common/interceptors';
import { Logger } from 'nestjs-pino';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import * as passport from 'passport';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ResultService } from './result/result.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AiModelService } from './ai-model/ai-model.service';

const signalsNames: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGHUP'];

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);
  const resultService = app.get(ResultService);
  const aiModelService = app.get(AiModelService);
  const apiVersion = configService.get('API_VERSION');
  const apiPrefix = 'api';

  app.enableCors({
    origin: '',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: apiVersion,
  });

  app.use(passport.initialize());

  app.setGlobalPrefix(apiPrefix);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Lottery API')
    .setDescription('API Documentation for Lottery Backend Server')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${apiPrefix}/v${apiVersion}/docs`, app, document, {
    customSiteTitle: 'Lottery API Documentation',
  });

  const logger = app.get(Logger);
  app.useLogger(logger);

  signalsNames.forEach((signalName) =>
    process.on(signalName, (signal) => {
      logger.log(`Retrieved signal: ${signal}, application terminated`);
      process.exit(0);
    }),
  );

  process.on('uncaughtException', (error: Error) => {
    logger.error({ err: error });
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Promise Rejection, reason: ${reason}`);
    promise.catch((err: Error) => {
      logger.error({ err });
      process.exit(1);
    });
  });

  app.disable('x-powered-by');
  const PORT = configService.get('PORT') || 8000;

  async function retryInsert() {
    await resultService
      .bulkInsert()
      .then(async () => {
        logger.log('Results inserted');
        await aiModelService.updatePredictionModel();
      })
      .catch((error) => {
        logger.error('Error inserting results', error);
      });
    const results = await resultService.findAll();
    if (results.length === 0) {
      logger.log('No results found, retrying insert');
      await retryInsert();
    }
  }

  await app.listen(PORT, async () => {
    const results = await resultService.findAll();
    if (results.length === 0) {
      logger.log('No results found, inserting from CSV');
      await retryInsert();
    }

    logger.log(`App is listening on port ${PORT}`);
  });
}
bootstrap();
