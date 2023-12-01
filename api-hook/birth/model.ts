import { MateModel } from '../mate/model';
import { RabbitModel } from '../rabbit/model';
import { UserModel } from '../user/model';

export type BirthModel = {
  id: string;
  birthAt: Date;

  mate: MateModel;
  rabbit: RabbitModel;

  user: UserModel;

  key: string;
};
