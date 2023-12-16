import { DrugModel } from '../drug/model';
import { RabbitModel } from '../rabbit/model';
import { UserModel } from '../user/model';

export type VacineModel = {
  id: string;
  vacineAt: Date;

  drug: DrugModel;
  rabbit: RabbitModel;

  user: UserModel;
};
