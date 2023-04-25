import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import * as bcrypt from 'bcrypt';
import { TokenCreationAttrs } from '../token/token.model';
import { env } from 'process';
import { PayloadDTO } from '../token/dtos/PayloadDTO';
import { UserLoginDTO, UserSignupDTO } from '../user/user.model';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {
  }

  async signup(dto: UserSignupDTO) {
    if (await this.userService.exists(dto.email))
      throw new HttpException(
        `USER WITH EMAIL ${dto.email} ALREADY EXISTS`,
        HttpStatus.BAD_REQUEST,
      );
    const hash = await bcrypt.hash(dto.password, Number(env.SALT));
    const user = await this.userService.create({
      username: dto.username,
      email: dto.email,
      password: hash,
    });
    const payload: PayloadDTO = { id: user.id, username: user.username, email: user.email };
    const pair = await this.tokenService.generatePair(payload);
    await user.$create('token', {
      userId: user.id,
      value: pair.refreshToken,
    } as TokenCreationAttrs);
    return { pair, payload };
  }

  async login(dto: UserLoginDTO) {
    const user = await this.userService.getByEmail(dto.email);
    if (!user) {
      throw new HttpException(
        'USER NOT FOUND',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!(await bcrypt.compare(dto.password, user.password))) {
      throw new HttpException(
        'INVALID PASSWORD',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload: PayloadDTO = { id: user.id, username: user.username, email: user.email };
    const pair = await this.tokenService.generatePair(payload);
    const token = await user.$get('token');
    if (token) {
      await token.update({ value: pair.refreshToken });
    } else {
      await user.$create('token', {
        userId: user.id,
        value: pair.refreshToken,
      } as TokenCreationAttrs);
    }
    return { pair, payload };
  }

  async logout(userId: number) {
    const user = await this.userService.getById(userId);
    const token = await user.$get('token');
    if (token) {
      await token.destroy();
    } else {
      this.logger.error(`token : ${token}`);
    }
  }

  async refresh(token: string) {
    const userData = await this.tokenService.verify(token);
    if (!userData) {
      throw new HttpException(
        'Unauthorized',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const user = await this.userService.getById(userData.id);
    const tokenEntity = await user.$get('token');
    if (!tokenEntity || tokenEntity.value !== token) {
      throw new HttpException(
        'Unauthorized',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload: PayloadDTO = { id: user.id, username: user.username, email: user.email };
    const pair = await this.tokenService.generatePair(payload);
    await tokenEntity.update({ value: pair.refreshToken });
    return { pair, payload };
  }
}
