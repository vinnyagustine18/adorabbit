import { RabbitModel } from '../rabbit/model';
import { UserModel } from '../user/model';

export enum PaymentEnum {
  transfer = 'transfer',
  cash = 'cash', //purchase still paid by cash
}

export enum TransactionStatusEnum {
  pending = 'pending',
  active = 'active',
  finish = 'finish', //purchase status still finish
  cancel = 'cancel',
}

export enum TransactionTypeEnum {
  sell = 'sell', //decrease
  purchase = 'purchase', //increase
}

export type TransactionModel = {
  id: string;
  transactionAt: Date;
  type: TransactionTypeEnum;
  status: TransactionStatusEnum;

  seller: UserModel;
  createBy: UserModel;

  paymentType: PaymentEnum;
  paymentAmount: number;
  paymentAt: Date | null;

  products: RabbitModel[];

  key: string;
};
