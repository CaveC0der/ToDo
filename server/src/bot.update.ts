import { Ctx, Hears, InjectBot, Message, On, Start, Update as UpdateController } from 'nestjs-telegraf';
import { Markup, Telegraf } from 'telegraf';
import { authKeyboard } from './bot/keyboards/auth.keyboard';
import { TelegramAccountService } from './telegram-account/telegram-account.service';
import { formatPhone } from './utils/formatPhone';
import { UserService } from './user/user.service';
import { formatToDoList } from './utils/formatToDoList';
import { mainMenuKeyboard } from './bot/keyboards/main.menu.keyboard';
import { IContext } from './bot/context/context.interface';
import { Message as TMessage } from 'telegraf/typings/core/types/typegram';
import { TodoEntryService } from './todo-entry/todo-entry.service';

@UpdateController()
export class BotUpdate {
  constructor(@InjectBot() private bot: Telegraf<IContext>,
              private telegramAccountService: TelegramAccountService,
              private userService: UserService,
              private todoEntryService: TodoEntryService) {
    this.bot.action('todo-list', async (ctx: IContext) => {
      await ctx.reply('todo-list');
    });
  }

  @Start()
  async start(ctx: IContext) {
    if (await this.checkAuth(ctx)) {
      await ctx.reply('What do you want to do?', mainMenuKeyboard());
    } else {
      await ctx.reply('Please authorize by sending your contact.', authKeyboard());
    }
  }

  @On('contact')
  async auth(ctx: IContext) {
    const message = ctx.message as TMessage.ContactMessage;
    const idFromMessage = message.from?.id;
    const idFromContact = message.contact.user_id;
    if (!idFromMessage || !idFromContact) {
      await ctx.reply('ERROR!', Markup.removeKeyboard());
      return;
    }
    if (idFromMessage !== idFromContact) {
      await ctx.reply('That\'s not your contact!', Markup.removeKeyboard());
      return;
    }
    const phone = formatPhone(message.contact.phone_number);
    try {
      const account = await this.telegramAccountService.bindTelegramUserId(phone, idFromContact);
      ctx.session.userId = account.userId;
    } catch (e) {
      await ctx.reply(
        'Your number is added to your account in Web App.' +
        'Please add your number in Web App first.',
        Markup.removeKeyboard(),
      );
      return;
    }
    await ctx.reply('Authorized.', mainMenuKeyboard());
  }

  @Hears('📜 ToDo List')
  async getToDoList(ctx: IContext) {
    if (await this.checkAuth(ctx)) {
      const todoList = await this.userService.getTodoList(ctx.session.userId as number);
      await ctx.reply(formatToDoList(todoList));
    }
  }

  @Hears('✅ Done')
  async doneToDoEntry(ctx: IContext) {
    if (await this.checkAuth(ctx)) {
      ctx.session.type = 'done-todo-entry';
      await ctx.reply('Send id');
    }
  }

  @Hears('✏ Create')
  async createToDoEntry(ctx: IContext) {
    if (await this.checkAuth(ctx)) {
      ctx.session.type = 'create-todo-entry';
      await ctx.reply('Send Todo in format:\ntask / priority\n(priority can be from 1 to 10)');
    }
  }

  @Hears('❌ Remove')
  async removeToDoEntry(ctx: IContext) {
    if (await this.checkAuth(ctx)) {
      ctx.session.type = 'remove-todo-entry';
      await ctx.reply('Send id');
    }
  }

  @On('text')
  async todoEntryAction(@Message('text') msg: string, @Ctx() ctx: IContext) {
    if (!ctx.session.type || !ctx.session.userId) {
      await ctx.reply('UNEXPECTED ERROR! Use /start', Markup.removeKeyboard());
      return;
    }
    switch (ctx.session.type) {
      case 'done-todo-entry': {
        const entryId = parseInt(msg.trim());
        if (Number.isNaN(entryId)) {
          await ctx.reply('Please send id as a number!');
          break;
        }
        try {
          const todoEntry = await this.todoEntryService.get(ctx.session.userId, entryId);
          await todoEntry.update({ done: true });
          ctx.session.type = undefined;
          await ctx.reply('Done.');
        } catch (e) {
          await ctx.reply('There is no entry with provided id.');
        }
        break;
      }
      case 'create-todo-entry': {
        const data = msg.trim().split(' / ');
        const task = data[0];
        const priority = parseInt(data[1]);
        if (priority < 1 || priority > 10) {
          await ctx.reply('Priority can be from 1 to 10, try again.');
          return;
        }
        try {
          await this.todoEntryService.create(ctx.session.userId, { task, priority, done: false });
          ctx.session.type = undefined;
          await ctx.reply('Created.');
        } catch (e) {
          await ctx.reply('Error occurred! Try again.');
        }
        break;
      }
      case 'remove-todo-entry': {
        const entryId = parseInt(msg.trim());
        if (Number.isNaN(entryId)) {
          await ctx.reply('Please send id as a number!');
          break;
        }
        try {
          await this.todoEntryService.delete(ctx.session.userId, entryId);
          ctx.session.type = undefined;
          await ctx.reply('Removed.');
        } catch (e) {
          await ctx.reply('There is no entry with provided id.');
        }
        break;
      }
    }
  }

  private async checkAuth(ctx: IContext): Promise<boolean> {
    if (!ctx.session.userId) {
      if (!ctx.from?.id) {
        console.log('!ctx.from?.id');
        await ctx.reply('ERROR!', Markup.removeKeyboard());
        return false;
      }
      try {
        const account = await this.telegramAccountService.getByTelegramUserId(ctx.from?.id);
        ctx.session.userId = account.userId;
        return true;
      } catch (e) {
        await ctx.reply('Unauthorized! Please use /start', Markup.removeKeyboard());
        return false;
      }
    }
    return true;
  }
}
