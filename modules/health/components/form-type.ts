import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { HealthStatusEnum } from '../../../api-hook/health/model';

export const HealthFormSchema = () =>
  Yup.object({
    checkAt: Yup.date().required().default(new Date()),
    weight: Yup.number().positive().required().default(0),
    status: Yup.string().required().default(HealthStatusEnum.well),
    description: Yup.string().required().default(''),
    //rabbit id
    rabbitId: Yup.string().required('').default(''),
  });

export type HealthFormType = Yup.InferType<ReturnType<typeof HealthFormSchema>>;

export type HealthFormMethod = ReturnType<typeof useForm<HealthFormType>>;
