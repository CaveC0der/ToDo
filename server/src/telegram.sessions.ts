import * as LocalSession from 'telegraf-session-local';

export const sessions = new LocalSession({
  database: 'sessions_db.json',
});
