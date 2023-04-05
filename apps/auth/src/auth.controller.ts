import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { User } from './users/schemas/user.schema';
import { Response } from 'express';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
    
  ) {
    await this.authService.login(user, response);
    return response.json(user);
  }
  @UseGuards(LocalAuthGuard)
  @MessagePattern('validateUser')
  async validateUser(@CurrentUser() user: User) {
    return user;
  }
  logOut(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }
}
