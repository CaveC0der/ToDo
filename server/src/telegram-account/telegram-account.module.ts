import { Module } from '@nestjs/common';
import { TelegramAccountService } from './telegram-account.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TelegramAccount } from './telegram-account.model';

@Module({
  imports: [SequelizeModule.forFeature([TelegramAccount])],
  providers: [TelegramAccountService],
  exports: [TelegramAccountService],
})
export class TelegramAccountModule {
}
