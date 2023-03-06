import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { RabbitMqModule } from '../rabbitmq/rabbitmq.module';
import { AUTH_SERVICE } from './services';

@Module({
  imports: [RabbitMqModule.register({ name: AUTH_SERVICE })],
  exports: [RabbitMqModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
