import * as Yup from 'yup';

import { useForm } from 'react-hook-form';
import { RabbitModel } from '../../../api-hook/rabbit/model';

import {
  PaymentEnum,
  TransactionStatusEnum,
  TransactionTypeEnum,
} from '../../../api-hook/transaction/model';
import { UserModel } from '../../../api-hook/user/model';

export const SellerFormSchema = () =>
  Yup.object({
    transactionAt: Yup.date().required().default(new Date()),
    type: Yup.string().required().default(TransactionTypeEnum.sell),
    status: Yup.string().required().default(TransactionStatusEnum.pending),
    paymentType: Yup.string().required().default(PaymentEnum.cash),
    paymentAmount: Yup.number().min(0).required().default(0),
    paymentAt: Yup.date().nullable().default(null),
  });

export type SellerFormType = Yup.InferType<
  ReturnType<typeof SellerFormSchema>
> & {
  products: RabbitModel[];
  seller: UserModel;
};

export type SellerFormMethod = ReturnType<typeof useForm<SellerFormType>>;
