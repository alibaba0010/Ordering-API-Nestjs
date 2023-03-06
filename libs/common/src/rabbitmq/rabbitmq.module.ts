import { DynamicModule, Module } from '@nestjs/common';
import { RabbitMqServices } from './rabbitmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

interface RabbitMqModuleOptions {
  name: string;
}
@Module({
  imports: [],
  providers: [RabbitMqServices],
  exports: [RabbitMqServices],
})
export class RabbitMqModule {
  static register({ name }: RabbitMqModuleOptions): DynamicModule {
    return {
      module: RabbitMqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RABBIT_MQ_URI')],
                queue: configService.get<string>(`RABBIT_MQ_${name}_QUEUE`),
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
