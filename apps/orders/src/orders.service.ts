//checked
import { Inject, Injectable } from '@nestjs/common';
import { CreateOrder } from './dto/CreateOrderDto';
import { OrderRepository } from './schemas/order.repository';
import { BILLING_SERVICE } from './constants/service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}
  async createOrder(request: CreateOrder, authentication: string) {
    const session = await this.orderRepository.startTransaction();
    console.log('session: ', session);

    try {
      const order = await this.orderRepository.create(request, { session });
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          request,
          Authentication: authentication,
        }),
      );
      await session.commitTransaction();
      return order;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async getOrders() {
    return this.orderRepository.find({});
  }
}
