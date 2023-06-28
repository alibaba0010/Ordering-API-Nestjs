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

