import * as Yup from "yup";

export const RegisterFormSchema = () =>
  Yup.object({
    email: Yup.string().email().required().default(""),
    password: Yup.string().required().default(""),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "password not match")
      .required()
      .default(""),
  });

export type RegisterFormType = Yup.InferType<
  ReturnType<typeof RegisterFormSchema>
>;
