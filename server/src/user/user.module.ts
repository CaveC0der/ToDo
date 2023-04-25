import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { TelegramAccountModule } from '../telegram-account/telegram-account.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), TelegramAccountModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
}
