import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        groups: ['transform'],
      },
    }),
  );

  const APP_PORT = process.env.APP_PORT || 3000;
  const NODE_ENV = process.env.NODE_ENV || 'development';

  const config = new DocumentBuilder()
    .setTitle('Empacotamento API')
    .setDescription(
      'API responsável por calcular a melhor forma de empacotar os pedidos da Loja do Seu Manoel. ' +
        'Recebe pedidos com produtos e dimensões, retorna caixas utilizadas e produtos alocados.',
    )
    .setVersion('1.0')
    .addTag('pedidos', 'Operações relacionadas a pedidos e empacotamento')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  if (NODE_ENV === 'development') {
    SwaggerModule.setup('api', app, document);
  }

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 4000,
    },
  });

  await app.listen(APP_PORT);

  logger.verbose(`(Running: http://localhost:${APP_PORT})`);
}
bootstrap();
