import { Options, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/httpException.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalFilters(new AllExceptionFilter());

  app.useGlobalInterceptors(new TimeOutInterceptor());

  app.useGlobalPipes(new ValidationPipe());
 
  const options= new DocumentBuilder()
  .setTitle('Api-Vuelos')
  .setDescription('calendarios de vuelos app')
  .setVersion('1.0.1')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  
  SwaggerModule.setup('/api/v1/docs',app,document);

  await app.listen(3000);
}
bootstrap();
