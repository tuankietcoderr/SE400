export type Promotion = {
  promotion_code: string;
  discount: number;
  title: string;
  description: string;
  valid_from: Date;
  valid_to: Date;
};
