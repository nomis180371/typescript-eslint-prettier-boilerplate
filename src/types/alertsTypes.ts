export type IAlertProductParams = {
  source?: 'vinted' | 'ebay';
  price: number;
  currency?: string;
  brand?: string;
  type: string;
  size?: string;
  viewCount?: number;
  colorId?: string | number;
  isSuspicious?: boolean;
  feedbackReputation?: number;
};

export type AlertType = {
  userId: string;
  channel: 'discord' | 'mail';
  productParams: IAlertProductParams;
};
