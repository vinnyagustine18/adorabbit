import { DrugModel } from "../drug/model";
import { RabbitModel } from "../rabbit/model";

export type VacineModel = {
  id: string;
  vacineAt: Date;

  drug: DrugModel;
  rabbit: RabbitModel;

  userId: string;
};
