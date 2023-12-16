import { UserModel } from '../user/model';

export type TypeModel = {
  id: string;
  name: string;

  user: UserModel;

  key: string;
};
