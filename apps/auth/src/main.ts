import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { RabbitMqServices } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RabbitMqServices>(RabbitMqServices);
  app.connectMicroservice(rmqService.getOptions('AUTH', true));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port, () =>
    console.log(`Listening at http://localhost:${port} 🚀🚀🚀`),
  );
}
bootstrap();
