import * as Yup from 'yup';

import { useForm } from 'react-hook-form';

export const VacineFormSchema = () =>
  Yup.object({
    vacineAt: Yup.date().required().default(new Date()),
    // drug table
    drugId: Yup.string().required().default(''),
    // rabbit table
    rabbitId: Yup.string().required().default(''),
  });

export type VacineFormType = Yup.InferType<ReturnType<typeof VacineFormSchema>>;

export type VacineFormMethod = ReturnType<typeof useForm<VacineFormType>>;
