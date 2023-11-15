import * as Yup from "yup";

export const LoginFormSchema = () =>
  Yup.object({
    email: Yup.string().email().required().default(""),
    password: Yup.string().required().default(""),
  });

export type LoginFormType = Yup.InferType<ReturnType<typeof LoginFormSchema>>;
