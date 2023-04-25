import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { PayloadDTO } from '../token/dtos/PayloadDTO';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('todo-list')
  async getTodoList(@Req() req: Request) {
    const { id } = req.user as PayloadDTO;
    return this.userService.getTodoList(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('telegram-account')
  async addTelegramAccount(@Req() req: Request, @Body('phone') phone: string) {
    const { id } = req.user as PayloadDTO;
    return this.userService.addTelegramAccount(id, phone);
  }

  @UseGuards(JwtAuthGuard)
  @Put('telegram-account')
  async updateTelegramAccount(@Req() req: Request, @Body('phone') phone: string) {
    const { id } = req.user as PayloadDTO;
    return this.userService.updateTelegramAccount(id, phone);
  }

  @UseGuards(JwtAuthGuard)
  @Get('telegram-account')
  async getTelegramAccount(@Req() req: Request) {
    const { id } = req.user as PayloadDTO;
    return this.userService.getTelegramAccount(id);
  }
}
