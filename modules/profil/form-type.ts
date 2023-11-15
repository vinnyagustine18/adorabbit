import * as Yup from "yup";

export const ProfilFormSchema = () =>
  Yup.object({
    email: Yup.string().required().default(""),
    name: Yup.string().required().default(""),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
    address: Yup.string(),
  });
