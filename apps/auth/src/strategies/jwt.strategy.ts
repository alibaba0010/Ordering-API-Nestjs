import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Types } from 'mongoose';
import { TokenPayload } from '../auth.service';
import { UserService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return request?.Authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_SEC'),
    });
  }

  async validate({ userId }: TokenPayload) {
    try {
      console.log('In strategy: ', userId);
      return await this.usersService.getUser({
        _id: new Types.ObjectId(userId),
      });
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
