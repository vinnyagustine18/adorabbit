import * as Yup from "yup";

import { useForm } from "react-hook-form";

export const TypeFormSchema = () =>
  Yup.object({
    name: Yup.string().required().default(""),
    // birthDate: Yup.date().required().default(new Date()),
  });

export type TypeFormType = Yup.InferType<ReturnType<typeof TypeFormSchema>>;

export type TypeFormMethod = ReturnType<typeof useForm<TypeFormType>>;
