export interface ITelegramAccount {
  id: number;
  phone: string;
  telegramUserId: number;
  userId: number;
}

export type ITelegramAccountPhone = Omit<ITelegramAccount, 'id' | 'telegramUserId' | 'userId'>
