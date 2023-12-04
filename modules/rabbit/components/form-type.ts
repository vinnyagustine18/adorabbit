import * as Yup from 'yup';

import { useForm } from 'react-hook-form';
import { GenderEnum } from '../../../api-hook/user/model';
import {
  RabbitOwnershipEnum,
  RabbitStatusEnum,
} from '../../../api-hook/rabbit/model';

export const RabbitFormSchema = () =>
  Yup.object({
    name: Yup.string().required().default(''),
    gender: Yup.string().required().default(GenderEnum.male),
    status: Yup.string().required().default(RabbitStatusEnum.alive),
    ownershipStatus: Yup.string()
      .required()
      .default(RabbitOwnershipEnum.collection),
    price: Yup.string().required().default(''),
    quantity: Yup.string().required().default(''),
    description: Yup.string().default(''),
    birthAt: Yup.date().required().default(new Date()),
    // type table
    typeId: Yup.string().required().default(''),
    isActive: Yup.boolean().default(true),
  });

export type RabbitFormType = Yup.InferType<ReturnType<typeof RabbitFormSchema>>;

export type RabbitFormMethod = ReturnType<typeof useForm<RabbitFormType>>;
