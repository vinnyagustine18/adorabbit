import { RabbitModel } from '../rabbit/model';
import { UserModel } from '../user/model';

export enum HealthStatusEnum {
  well = 'well',
  sick = 'sick',
}

export type HealthModel = {
  id: string;
  checkAt: Date;
  weight: number;
  status: HealthStatusEnum;
  description: string;

  rabbit: RabbitModel;
  user: UserModel;

  key: string;
};
