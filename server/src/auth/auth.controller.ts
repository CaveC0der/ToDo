import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { env } from 'process';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PayloadDTO } from '../token/dtos/PayloadDTO';
import { UserLoginDTO, UserSignupDTO } from '../user/user.model';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  refreshCookieName: string;

  constructor(private authService: AuthService,
              private configService: ConfigService) {
    this.refreshCookieName = configService.getOrThrow<string>('REFRESH_COOKIE_NAME');
  }

  @Post('signup')
  async signup(@Body() dto: UserSignupDTO, @Res() res: Response) {
    const userData = await this.authService.signup(dto);
    res.cookie(this.refreshCookieName, userData.pair.refreshToken, {
      maxAge: Number(env.REFRESH_COOKIE_MAX_AGE),
      httpOnly: true,
      sameSite: 'strict',
    });
    res.json({
      accessToken: userData.pair.accessToken,
      user: userData.payload,
    });
  }

  @Post('login')
  async login(@Body() dto: UserLoginDTO, @Res() res: Response) {
    const userData = await this.authService.login(dto);
    res.cookie(this.refreshCookieName, userData.pair.refreshToken, {
      maxAge: Number(env.REFRESH_COOKIE_MAX_AGE),
      httpOnly: true,
      sameSite: 'strict',
    });
    res.json({
      accessToken: userData.pair.accessToken,
      user: userData.payload,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const { id } = req.user as PayloadDTO;
    await this.authService.logout(id);
    res.clearCookie(this.refreshCookieName);
    res.json({ _: 'logout' });
  }

  @Get('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const userData = await this.authService.refresh(req.cookies[this.refreshCookieName]);
    res.cookie(this.refreshCookieName, userData.pair.refreshToken, {
      maxAge: Number(env.REFRESH_COOKIE_MAX_AGE),
      httpOnly: true,
      sameSite: 'strict',
    });
    res.json({
      accessToken: userData.pair.accessToken,
      user: userData.payload,
    });
  }
}
