import * as Yup from "yup";

import { useForm } from "react-hook-form";
import { GenderEnum } from "../../../api-hook/user/model";

export const BirthFormSchema = () =>
  Yup.object({
    birthWeight: Yup.number().positive().required().default(0),
    description: Yup.string().default(""),
    //autofill by rabbit id
    birthAt: Yup.date().required().default(new Date()),
    gender: Yup.string().required().default(GenderEnum.male),
    name: Yup.string().default(""),
    // mate id
    mateId: Yup.string().required().default(""),
    // rabbit id
    rabbitId: Yup.string().required().default(""),
  });

export type BirthFormType = Yup.InferType<ReturnType<typeof BirthFormSchema>>;

export type BirthFormMethod = ReturnType<typeof useForm<BirthFormType>>;
