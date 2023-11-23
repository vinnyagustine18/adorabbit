import * as Yup from "yup";
import {
  BreadOwnershipEnum,
  BreadStatusEnum,
} from "../../../api-hook/breads/model";
import { useForm } from "react-hook-form";

export const BreadFormSchema = () =>
  Yup.object({
    name: Yup.string().required().default(""),
    gender: Yup.string().required().default("male"),
    birthDate: Yup.date().required().default(new Date()),
    status: Yup.string().required().default(BreadStatusEnum.alive),
    ownershipStatus: Yup.string()
      .required()
      .default(BreadOwnershipEnum.collection),
    price: Yup.number().positive().required(),
    description: Yup.string().default(""),
  });

export type BreadFormType = Yup.InferType<ReturnType<typeof BreadFormSchema>>;

export type BreadFormMethod = ReturnType<typeof useForm<BreadFormType>>;
