import { Markup } from 'telegraf';

export const authKeyboard = () => Markup.keyboard([
  Markup.button.contactRequest('Send contact'),
]).resize();
