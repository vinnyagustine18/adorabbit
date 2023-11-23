import { useForm } from "react-hook-form";
import * as Yup from "yup";

export const DrugFormSchema = () =>
  Yup.object({
    type: Yup.string().required().default(""),
    dose: Yup.number().required().default(0),
  });

export type DrugFormType = Yup.InferType<ReturnType<typeof DrugFormSchema>>;

export type DrugFormMethod = ReturnType<typeof useForm<DrugFormType>>;
