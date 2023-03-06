import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { RabbitMqServices } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  const rmqService = app.get<RabbitMqServices>(RabbitMqServices);
  app.connectMicroservice(rmqService.getOptions('BILLING'));
  await app.startAllMicroservices();
}
bootstrap();

// import { ValidationPipe } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// app.useGlobalPipes(new ValidationPipe());
// const configService = app.get(ConfigService);
// const port = configService.get('PORT');
// await app.listen(port, () =>
//   console.log(`Listening at http://localhost:${port} 🚀🚀🚀`),
// );
