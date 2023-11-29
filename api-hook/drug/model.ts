import { UserModel } from '../user/model';

export type DrugModel = {
  id: string;
  type: string;
  dose: number;

  user: UserModel;

  key: string;
};
