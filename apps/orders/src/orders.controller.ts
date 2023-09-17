import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrder } from './dto/CreateOrderDto';
import { JwtAuthGuard } from '@app/common';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Post('create-order')
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() request: CreateOrder, @Req() req: any) {
    console.log('Request: ', request);
    return await this.ordersService.createOrder(
      request,
      req.cookies?.Authentication,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getOrders() {
    return await this.ordersService.getOrders();
  }
}
