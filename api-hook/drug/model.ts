import { UserModel } from '../user/model';

export type DrugModel = {
  id: string;
  type: string;
  dose: string;

  user: UserModel;

  key: string;
};
