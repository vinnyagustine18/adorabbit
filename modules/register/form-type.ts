import { useForm } from "react-hook-form";
import * as Yup from "yup";

export const RegisterFormSchema = () =>
  Yup.object({
    //email
    email: Yup.string().email().required().default(""),
    password: Yup.string().required().default(""),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "password not match")
      .required()
      .default(""),
    //information
    name: Yup.string().required().default(""),
    phoneNumber: Yup.string().required().default(""),
    //address
    address: Yup.string().default(""),
    longitude: Yup.number().required().default(0),
    latitude: Yup.number().required().default(0),
  });

export type RegisterFormType = Yup.InferType<
  ReturnType<typeof RegisterFormSchema>
>;

export type RegisterFormMethod = ReturnType<typeof useForm<RegisterFormType>>;
