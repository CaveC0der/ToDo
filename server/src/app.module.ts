import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { TelegramAccountModule } from './telegram-account/telegram-account.module';
import { TodoEntryModule } from './todo-entry/todo-entry.module';
import { env } from 'process';
import { User } from './user/user.model';
import { Token } from './token/token.model';
import { TelegramAccount } from './telegram-account/telegram-account.model';
import { TodoEntry } from './todo-entry/todo-entry.model';
import { TelegrafModule } from 'nestjs-telegraf';
import { sessions } from './telegram.sessions';
import { BotUpdate } from './bot.update';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: env.POSTGRES_HOST,
      port: Number(env.POSTGRES_PORT),
      username: env.POSTGRES_USERNAME,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DATABASE,
      models: [User, Token, TelegramAccount, TodoEntry],
      autoLoadModels: true,
    }),
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: env.TELEGRAM_BOT_TOKEN ?? '',
    }),
    UserModule,
    TokenModule,
    TelegramAccountModule,
    TodoEntryModule,
    AuthModule,
  ],
  providers: [BotUpdate],
})
export class AppModule {
}
