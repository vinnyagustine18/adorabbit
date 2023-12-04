import * as Yup from 'yup';

import { useForm } from 'react-hook-form';

export const BirthFormSchema = () =>
  Yup.object({
    birthAt: Yup.date().required().default(new Date()),
    mateId: Yup.string().required().default(''),
    rabbitId: Yup.string().required().default(''),
    birthWeight: Yup.string().required().default(''),
    description: Yup.string().default(''),
  });

export type BirthFormType = Yup.InferType<ReturnType<typeof BirthFormSchema>>;

export type BirthFormMethod = ReturnType<typeof useForm<BirthFormType>>;
