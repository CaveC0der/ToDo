import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './token.model';
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { PayloadDTO } from './dtos/PayloadDTO';
import { PairDTO } from './dtos/PairDTO';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token) private tokenRepository: typeof Token,
    private jwtService: JwtService,
  ) {
  }

  async generatePair(payload: PayloadDTO): Promise<PairDTO> {
    return {
      accessToken: (await this.jwtService.signAsync(payload, {
        secret: env.JWT_ACCESS_SECRET,
        expiresIn: env.JWT_ACCESS_EXPIRES_IN,
      })),
      refreshToken: (await this.jwtService.signAsync(payload, {
        secret: env.JWT_REFRESH_SECRET,
        expiresIn: env.JWT_REFRESH_EXPIRES_IN,
      })),
    };
  }

  async verify(token: string): Promise<PayloadDTO | undefined> {
    try {
      return this.jwtService.verifyAsync<PayloadDTO>(token, { secret: env.JWT_REFRESH_SECRET });
    } catch (e) {
      return undefined;
    }
  }
}
