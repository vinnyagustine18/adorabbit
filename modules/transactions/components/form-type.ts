import * as Yup from 'yup';

import { useForm } from 'react-hook-form';
import { RabbitModel } from '../../../api-hook/rabbit/model';

import {
  PaymentEnum,
  TransactionStatusEnum,
  TransactionTypeEnum,
} from '../../../api-hook/transaction/model';

export const TransactionFormSchema = () =>
  Yup.object({
    transactionAt: Yup.date().required().default(new Date()),
    type: Yup.string().required().default(TransactionTypeEnum.purchase),
    status: Yup.string().required().default(TransactionStatusEnum.finish),
    //its must deleted if transaction is purchase
    paymentType: Yup.string().required().default(PaymentEnum.cash),
    paymentAmount: Yup.number().min(0).required().default(0),
    paymentAt: Yup.date().nullable().default(null),
  });

export type TransactionFormType = Yup.InferType<
  ReturnType<typeof TransactionFormSchema>
> & {
  products: RabbitModel[];
  isSales: boolean;
};

export type TransactionFormMethod = ReturnType<
  typeof useForm<TransactionFormType>
>;
