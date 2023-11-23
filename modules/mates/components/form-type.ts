import * as Yup from "yup";

import { useForm } from "react-hook-form";

export const MateFormSchema = () =>
  Yup.object({
    // rabbit table
    maleRabbitId: Yup.string().required().default(""),
    // rabbit table
    femaleRabbitId: Yup.string().required().default(""),

    mateAt: Yup.date().required().default(new Date()),
    description: Yup.string().default(""),
  });

export type MateFormType = Yup.InferType<ReturnType<typeof MateFormSchema>>;

export type MateFormMethod = ReturnType<typeof useForm<MateFormType>>;
