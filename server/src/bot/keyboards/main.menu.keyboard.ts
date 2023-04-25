import { Markup } from 'telegraf';

export const mainMenuKeyboard = () => Markup.keyboard(
  [
    Markup.button.callback('📜 ToDo List', 'todo-list'),
    Markup.button.callback('✅ Done', 'done-todo-entry'),
    Markup.button.callback('✏ Create', 'create-todo-entry'),
    Markup.button.callback('❌ Remove', 'remove-todo-entry'),
  ],
  {
    columns: 5,
  },
).resize();
