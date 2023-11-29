import { RabbitModel } from '../rabbit/model';
import { UserModel } from '../user/model';

export type MateModel = {
  id: string;
  mateAt: Date;
  description: string;

  maleRabbit: RabbitModel;
  femaleRabbit: RabbitModel;

  user: UserModel;
  key: string;
};
